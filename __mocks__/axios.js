// TodoList 组件下的 axios 被模拟

const mockUndoList = {
  data: [{
    value: 'jest',
    isFocus: true,
    isChecked: false
  }, {
    value: 'TDD',
    isFocus: false,
    isChecked: true
  }, {
    value: 'react',
    isFocus: false,
    isChecked: false
  }],
  success: true
}

export default {
  get(url) {
    if (url === '/undolist.json') {
      return new Promise((resolve, reject) => {
        if (this.success) {
          resolve(mockUndoList)
        } else {
          reject(new Error('500'))
        }
      })
    }
  }
} 