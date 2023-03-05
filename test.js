const logg = require('./index')

logg.detail('1','2','3','4','5')
logg.addInputRequest('11','22','33','44','55')
logg.addOutputResponse('111','222','333','444','555')
console.log(logg.getDetail());

logg.end()