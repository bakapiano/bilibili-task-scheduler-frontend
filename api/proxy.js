const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (req, res) => {
  let target = ''

  if (req.url.startsWith('/api')) {
    target = 'http://121.4.44.73:8000'
  }

  // 创建代理对象并转发请求
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      '^/api/': '/'
    }
  })(req, res)
}