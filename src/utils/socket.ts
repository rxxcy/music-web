import {
  io,
  Socket,
  type SocketOptions,
  type ManagerOptions,
} from 'socket.io-client'

interface SocketConfig {
  url: string
  options?: Partial<SocketOptions & ManagerOptions> //  类型更宽容，允许传递所有可能的选项
  autoConnect?: boolean
  reconnectAttempts?: number
  reconnectDelay?: number
}

interface SocketIOEvents {
  connect: () => void
  disconnect: (reason: string) => void
  reconnect: (attemptNumber: number) => void
  reconnect_attempt: (attemptNumber: number) => void // 添加 reconnect_attempt 事件
  reconnect_error: (error: Error) => void // 添加 reconnect_error 事件
  reconnect_failed: () => void // 添加 reconnect_failed 事件
  [event: string]: (...args: any[]) => void // 允许自定义事件
}

export class SocketService {
  private socket: Socket | null = null
  private config: SocketConfig
  private eventListeners: { [event: string]: (...args: any[]) => void } = {}

  constructor(config: SocketConfig) {
    this.config = config
    if (config.autoConnect === undefined) {
      this.config.autoConnect = true // 默认自动连接
    }

    this.config.reconnectAttempts = config.reconnectAttempts || Infinity // 默认无限次重连
    this.config.reconnectDelay = config.reconnectDelay || 1000 // 默认重连延迟 1 秒
  }

  /**
   * 连接到 Socket.IO 服务器
   */
  connect(): void {
    if (this.socket && this.socket.connected) {
      console.warn('Socket is already connected.')
      return
    }

    this.socket = io(this.config.url, this.config.options)

    this.socket.on('connect', () => {
      console.log('Connected to Socket.IO server')
      this.emit('connect') // 触发自定义 connect 事件
    })

    this.socket.on('disconnect', (reason: string) => {
      console.log(`Disconnected from Socket.IO server: ${reason}`)
      this.emit('disconnect', reason) // 触发自定义 disconnect 事件
    })

    this.socket.on('reconnect', (attemptNumber: number) => {
      console.log(`Reconnected after ${attemptNumber} attempts`)
      this.emit('reconnect', attemptNumber) // 触发自定义 reconnect 事件
    })

    this.socket.on('reconnect_attempt', (attemptNumber: number) => {
      console.log(`Attempting to reconnect: ${attemptNumber}`)
      this.emit('reconnect_attempt', attemptNumber)
    })

    this.socket.on('reconnect_error', (error: Error) => {
      console.error(`Reconnect error: ${error.message}`)
      this.emit('reconnect_error', error)
    })

    this.socket.on('reconnect_failed', () => {
      console.error('Reconnect failed.')
      this.emit('reconnect_failed')
    })

    // 自动连接逻辑
    if (!this.config.autoConnect) {
      this.socket.disconnect()
    }
  }

  /**
   * 断开与 Socket.IO 服务器的连接
   */
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null // 清空 socket 引用
      console.log('Disconnected from Socket.IO server manually.')
    } else {
      console.warn('Socket is not connected.')
    }
  }

  /**
   * 监听 Socket.IO 事件
   * @param eventName 事件名称
   * @param callback  回调函数
   */
  on<T extends keyof SocketIOEvents>(
    eventName: string,
    callback: SocketIOEvents[T]
  ): void {
    if (!this.socket) {
      console.error('Socket is not initialized. Call connect() first.')
      return
    }

    if (this.eventListeners[eventName]) {
      console.warn(`Overwriting existing listener for event: ${eventName}`)
      this.off(eventName) // 移除旧的监听器，防止重复触发
    }

    this.socket.on(eventName, callback)
    this.eventListeners[eventName] = callback // 存储监听器，便于移除
  }

  /**
   * 发送 Socket.IO 事件
   * @param eventName 事件名称
   * @param data      要发送的数据
   */
  emit(eventName: string, ...data: any[]): void {
    if (!this.socket) {
      console.error('Socket is not initialized. Call connect() first.')
      return
    }

    this.socket.emit(eventName, ...data)
  }

  /**
   * 移除 Socket.IO 事件监听器
   * @param eventName 事件名称
   */
  off(eventName: string): void {
    if (!this.socket) {
      console.error('Socket is not initialized. Call connect() first.')
      return
    }

    if (this.eventListeners[eventName]) {
      this.socket.off(eventName, this.eventListeners[eventName])
      delete this.eventListeners[eventName]
    } else {
      console.warn(`No listener found for event: ${eventName}`)
    }
  }

  /**
   * 移除所有 Socket.IO 事件监听器
   */
  removeAllListeners(): void {
    if (!this.socket) {
      console.error('Socket is not initialized. Call connect() first.')
      return
    }

    this.socket.removeAllListeners()
    this.eventListeners = {} // 清空存储的监听器
  }

  /**
   * 获取当前socket的状态
   */
  get connected(): boolean {
    return this.socket ? this.socket.connected : false
  }
}

export default SocketService

/*

const config = {
  url: 'http://localhost:3000',
  options: {
    transports: ['websocket'],
  },
  autoConnect: false,
  reconnectAttempts: 5,
  reconnectDelay: 2000,
};

const socketService = new SocketService(config);

socketService.on('connect', () => {
  console.log('Custom connect handler');
  socketService.emit('chat message', 'Hello from client!');
});

socketService.on('disconnect', (reason: string) => {
  console.log('Custom disconnect handler: ', reason);
});

socketService.on('chat message', (msg: string) => {
  console.log('Received message: ' + msg);
});

socketService.on('reconnect_attempt', (attemptNumber: number) => {
  console.log(`Reconnect attempt ${attemptNumber}`);
});


socketService.connect(); // 手动连接


*/
