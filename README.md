# Why Slow Vite

## Kurulum

`npm install`

ve daha sonra `.env` dosyasi olusturup icine **VITE_API_KEY** adinda bir degisken olusturup buraya da **openweathermap** apisinden aldiginiz keyi ekleyin.

## Amac

Bu projenin amaci vite'in neden buyuk projelerde yavas oldugunu anlamaktir.

Oncelikle kurulum adimini tamamladiktan sonra ilk olarak `npm run standard-import-components.js` komutunu calistirarak yavas halini gorebilirsiniz.

## Yontem

`standard-import-components.js` adindaki dosyayla rastgele sehirler icin hava durumu istegi atiyorum. Cok sayidaki component istek yapinca vite'in browserda projeyi yuklemesi cok zaman aliyor.

Burada vite'in yavaslamasi gordukten sonra projenizi durdurup `npm run lazy-loading-components` komutunu calistirarak aradaki performans farkini gorebilirsiniz.

## Cozumler

### Lazy Loading

Bu yontem ile kullanilarak sadece goruntulenen componentin yuklenmesi saglanacak.

`npm run lazy-loading-components` komutunu calistirarak lazy loading halini gorebilirsin.

**Not: Api istek limiti dolabilir dikkatli olun. Beklediginizden erken yuklenmisse muhtemelen istek limitiniz dolmustur**
