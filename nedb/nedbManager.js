import Datastore from 'nedb'
import path from 'path'
import Constants from '../electron/const'

export default class DBManager {
  constructor() {
    // 数据库文件路径
    this.dbPath = path.join(Constants.__dirname, './data.db')
    // 如果没有传入 { filename: this.dbPath }，nedb会创建一个内存数据库。
    // 或者显示的告诉nedb，创建内存数据库。传入 { inMemoryOnly: true }
    // 如下面的代码，是把数据放到 this.dbPath 硬盘里，不把数据存储到内存
    // 因为在 NeDB 中，默认情况下会创建一个内存数据库（如果没有指定文件路径）
    this.db = new Datastore({ filename: this.dbPath, autoload: true,corruptAlertThreshold: 1 })
    // corruptAlertThreshold: 0 到 1 之间，默认为 10%。如果超过这个百分比的数据文件损坏，NeDB 将拒绝启动。 0 表示您不容忍任何腐败，1 表示您不在乎。
  }

  async insert(doc) {
    return new Promise((resolve, reject) => {
      this.db.insert(doc, (err, res) => {
        if (err) {
          console.error('数据库写入数据失败', err);
          reject(err)
        } else {
          resolve(res);
        }
      })
    })
  }

  async find(query) {
    return new Promise((resolve, reject) => {
      this.db.find(query, (err, docs) => {
        if (err) {
          console.error('Failed to find documents:', err);
          reject(err);
        } else {
          resolve(docs);
        }
      });
    });
  }

  async update(query) {
    return new Promise((resolve, reject) => {
      this.db.update(query, (err,numReplace) => {
        if (err) {
          console.error('数据库更新失败', err);
          reject(err);
        } else {
          resolve(numReplace);
        }
      })
    })
  }

  async remove(query) {
    return new Promise((resolve,reject) => {
      this.db.remove(query, (err,numRemove) => {
        if (err) {
          console.error('数据库更新失败', err);
          reject(err);
        } else {
          resolve(numRemove);
        }
      })
    })
  }
}

// module.exports = DBManager
