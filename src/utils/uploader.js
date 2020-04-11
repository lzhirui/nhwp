import Vue from 'vue'
const OSS = require('ali-oss')
class uploadCenter {
  // 解析错误信息
  errorMsg(errCode, errMsg, data = null) {
    const returnData = data ? { errCode, errMsg, data } : { errCode, errMsg }
    return returnData
  }

  getYearMonthDay = () => {
    let date = Date.parse(new Date()) //  获取当前时间戳(毫秒)
    let newDate = new Date(date)
    let { y, m, d } = { y: newDate.getFullYear(), m: newDate.getMonth() + 1, d: newDate.getDate() }
    if (m >= 1 && m <= 9) {
      m = '0' + m
    }
    if (d >= 0 && d <= 9) {
      d = '0' + d
    }
    return `${y}${m}${d}`
  }

  // 上传文件
  async _uploadFile(file, oss = null) {
    return new Promise((resolve, reject) => {
      const onTime = new Date(Date.now() + 1000 * 60 * 60 * 8)
      // eslint-disable-next-line
      const fileName = `${onTime.toISOString().replace(/\:/g, '-')}.jpg`
      oss.client
        .multipartUpload(`${oss.filedir}/${fileName}`, file, {
          progress: () => {}
        })
        .then(result => {
          resolve(this.errorMsg(0, 'success', { imgUrl: `http://shuangshionlineoss.speiyou.com/${result.name}` }))
        })
        .catch(err => {
          reject(this.errorMsg(-1, 'error', err))
        })
    })
  }
  // 上传buffer文件
  async _uploadContent(content, oss = null) {
    return new Promise((resolve, reject) => {
      const onTime = new Date(Date.now() + 1000 * 60 * 60 * 8)
      // eslint-disable-next-line
      const fileName = `${onTime.toISOString().replace(/\:/g, '-')}.log`
      oss.client
        .put(`${oss.filedir}/${fileName}`, new Buffer(content))
        .then(result => {
          resolve(this.errorMsg(0, 'success', { imgUrl: `http://shuangshionlineoss.speiyou.com/${result.name}` }))
        })
        .catch(err => {
          reject(this.errorMsg(-1, 'error', err))
        })
    })
  }
  // 从服务端获取oss配置参数
  applyTokenDo(token) {
    return Vue.prototype
      .$request({
        method: 'GET',
        url: '/api/online/oss/policy/tutor',
        headers: {
          online_token_cookie: token,
          client: 'TUTOR_IPAD'
        },
        params: {
          appver: '2.1.334',
          type: '0',
          tutorId: 'd0bbdc15ccd3425f9f32c15b7f8afb62',
          build: '202000302003'
        }
      })
      .then(res => {
        if (res.code === 0) {
          const ossConfig = new OSS({
            region: 'oss-cn-beijing',
            accessKeyId: res.result.accessKeyId,
            accessKeySecret: res.result.accessKeySecret,
            bucket: res.result.bucketName,
            stsToken: res.result.securityToken
          })
          const ossDir = `${res.result.clientRootName}/images/${this.getYearMonthDay()}`
          return {
            client: ossConfig,
            filedir: ossDir
          }
        } else {
          return null
        }
      })
  }
  async uploadFile(file, token) {
    if (!file || !token) return this.errorMsg(20001, '缺少参数')
    const oss = await this.applyTokenDo(token)
    const result = await this._uploadFile(file, oss)
    return result
  }
  async uploadContent(content, token) {
    if (!content || !token) return this.errorMsg(20001, '缺少参数')
    const oss = await this.applyTokenDo(token)
    const result = await this._uploadContent(content, oss)
    return result
  }
}

let upload = null

function getUploadCenter() {
  if (upload == null) {
    upload = new uploadCenter()
  }
  return upload
}

export { getUploadCenter }
