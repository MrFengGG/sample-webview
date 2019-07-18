const proxy = {
    'GET /menu/get': [
        {
          "link": "/jobList",
          "name": "工作列表",
          "code": "1",
          "icon": "table",
          "child": []
        },
        {
          "link": "/dashBoard",
          "name": "仪表盘",
          "code": "2",
          "icon": "radar-chart",
          "child": []
        },
        {
          "link": "/logCheck",
          "name": "查看日志",
          "code": "3",
          "icon": "copy",
          "child": []
        }
     ],
     "GET /task/get":[{"name":"sayYes","cronExpress":"1/1 * * * * ?","status":"NORMAL","group":"sayGroup","description":"说对","jobClass":"com.feng.test.TestJob"},{"name":"test1","cronExpress":"1/1 * * * * ?","status":"NORMAL","group":"test","description":"测试任务1","jobClass":"com.feng.test.TestJob"},{"name":"test2","cronExpress":"1/1 * * * * ?","status":"NORMAL","group":"test","description":"测试任务2","jobClass":"com.feng.test.TestJob"},{"name":"sayHello","cronExpress":"1/1 * * * * ?","status":"NORMAL","group":"sayGroup","description":"说你好","jobClass":"com.feng.test.TestJob"},{"name":"test1","cronExpress":"1/1 * * * * ?","status":"NORMAL","group":"whatever","description":"随便什么","jobClass":"com.feng.test.TestJob"}],
     "GET /work/get":[{"name":"测试扫描工作类","className":"com.feng.test.TestWork2","description":"测试工作扫描"},{"name":"测试工作类","className":"com.feng.test.TestWork","description":"测试名称"}],
     "GET /actuator/metrics/system.cpu.usage":(req, res)=>{res.send({"name":"system.cpu.usage","measurements":[{"statistic":"VALUE","value":Math.random()}],"availableTags":[]})}
  }
  module.exports = proxy;