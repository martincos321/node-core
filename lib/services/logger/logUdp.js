var dgram = require('dgram');
var client = dgram.createSocket('udp4');
var path = require('path');

client.on("error", function (err) {
  console.error("logUdp:client.on(error)", "Error logging socket: " + err);
  client.close();
  client = dgram.createSocket('udp4');
});

var LogUdp = function(){

  function log(message, ref) {
    format(message, ref);
  }

  function debug(message, ref) {
    format(message, ref);
  }

  function trace(message, ref) {
    format(message, ref);
  }

  function info(message, ref) {
    format(message, ref);
  }

  function warning(message, ref) {
    format(message, ref);
  }

  function error(message, ref) {
    format(message, ref);
  }

  function format(message, ref) {

    var data = (ref && ref.reqInfo)? ref.reqInfo : (ref && ref.headers)? ref.headers : ref;

    var actualDate = new Date();
    var actualMonth = (actualDate.getMonth() == 11)? 12 : actualDate.getMonth() + 1;
    var dateTo = actualDate.getFullYear()+"/"+actualMonth+"/"+actualDate.getDate()+" "+actualDate.getHours()+":"+actualDate.getMinutes()+":"+actualDate.getSeconds()+","+actualDate.getMilliseconds();
    var level = (format.caller)? format.caller.name.toUpperCase() : "INFO";
    var cluster = cluster || 1;
    var cpuCore = (cluster && cluster.worker)? "[CORE-" + cluster.worker.id+"]" : "[CORE-1]";
    var uowId = (data && data.uow)? "["+data.uow+"]" : (data && data["X-UOW"])? "["+data["X-UOW"]+"]" : (data && data["x-uow"])? "["+data["x-uow"]+"]" : undefined;
    var dataInfo = undefined;
    var responseLog = [];

    if(data){
      try{ 
        dataInfo = JSON.stringify(data); 
      }catch(e){}
    }

    responseLog.push(dateTo);
    responseLog.push(level);
    responseLog.push(cpuCore);
    responseLog.push(uowId);
    
    if (process.env.LOG_LEVEL == '2') {
      responseLog.push(dataInfo);
    }
    
    responseLog.push(message);

    responseLog = responseLog.filter(function(n){ return n !== undefined; });

    responseLog = responseLog.join(" ");

    if (process.env.LOG_LEVEL == '1' || process.env.LOG_LEVEL == '2' || env != 'production') {
      console.log(responseLog);
    }

    if (env == 'production' && (!level || level == 'ERROR' || level == 'INFO')) {
        if (process.env.LOG_LEVEL != '2' && level == 'ERROR') {
          sendUdp(responseLog + " " + dataInfo);
        }else{
          sendUdp(responseLog);
        }
    }
  }
  /*
   * Log message to UDP
   */
  function sendUdp(message) {
    if (env == "development" || env == "test") return false;

    message = new Buffer(message);

    client.send(message, 0, message.length, config.logUdp.port, config.logUdp.ip, function (err, bytes) {
      if (err) format("logUdp:sendUdp - > Error logging UDP", {});
    });
  }

  function getInfo() {

    var data = [];
    data.method = data.path = data.line = data.pos = data.file = '';

    var stacklist = (new Error()).stack.split('\n').slice(3);
    var stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi;
    var stackReg2 = /at\s+()(.*):(\d*):(\d*)/gi;

    var s = stacklist[config.stackIndex] || stacklist[0], sp = stackReg.exec(s) || stackReg2.exec(s);
    if (sp && sp.length === 5) {
      data.method = sp[1];
      data.path = sp[2];
      data.line = sp[3];
      data.pos = sp[4];
      data.file = path.basename(data.path);
      data.stack = stacklist.join('\n');
    }

    return data;
  };

  newrelic: require('newrelic/lib/logger').child({component: 'error_rate'});

  return{
    log     : log,
    debug   : debug,
    trace   : trace,
    info    : info,
    warning : warning,
    error   : error 
  };

};

module.exports = LogUdp();