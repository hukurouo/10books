const functions = require('firebase-functions');
const express = require('express')
const app = express()
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore()

const url = 'https://books-card-maker.web.app/'
const site_name = '10冊メーカー'
const meta_description = '小説10選のページが生成できます。ログイン不要。'
const meta_keywords = ['名刺代わりの小説10選', '小説']
const og_description = '小説10選のページが生成できます。ログイン不要。'
const og_image_width = 600
const og_image_height = 315
const fb_appid = ''
const tw_description = ''
const tw_site = ''
const tw_creator = ''

const genHtml = (param, title) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
    <meta name="description" content=${meta_description}>
    <meta name="keywords" content=${meta_keywords.join(',')}>
    <meta property="og:locale" content="ja_JP">
    <meta property="og:type" content="website">
    <meta property="og:url" content=${url}>
    <meta property="og:title" content=${title}>
    <meta property="og:site_name" content=${site_name}>
    <meta property="og:description" content=${og_description}>
    <meta property="og:image:width" content=${og_image_width}>
    <meta property="og:image:height" content=${og_image_height}>
    <meta property="fb:app_id" content=${fb_appid}>
    <meta name="twitter:title" content=${title}>
    <meta name="twitter:description" content=${tw_description}>
    <meta name="twitter:site" content=${tw_site}>
    <meta name="twitter:creator" content=${tw_creator}>
    <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/books-card-maker.appspot.com/o/ogp%2F${param}.png?alt=media&token=9476a1a2-ce07-4fcb-bd99-634b1a4a13a5">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image" content="https://firebasestorage.googleapis.com/v0/b/books-card-maker.appspot.com/o/ogp%2F${param}.png?alt=media&token=9476a1a2-ce07-4fcb-bd99-634b1a4a13a5">
  </head>
  <body>
    <script>
      // クローラーにはメタタグを解釈させて、人間は任意のページに飛ばす
      location.href = 'https://books-card-maker.web.app/redirect/${param}';
    </script>
  </body>
</html>
`
app.get('/id/:id', async (req, res) => {
  const docRef = db.collection("cards").doc(req.params.id)
  try {
    const docID = await docRef.get()
    if (docID.data() == undefined) {
      return res.status(404).json({
        error: {
          message: "docment が参照できませんでした"
        }
      })
    }
    const title = docID.data().name + "さんの名刺代わりの小説10選"
    const html = genHtml(req.params.id, title)
    res.set('cache-control', 'public, max-age=3600');
    return res.send(html)

  } catch (err) {
    return res.status(400).json({
      error: {
          message: err.message
      }
    })
  }
})

exports.generate = functions.https.onRequest(app)