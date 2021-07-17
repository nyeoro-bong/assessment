`use strict`
const userNameInput = document.getElementById(`user-name`);
const assessmentButton = document.getElementById(`assesment`);
const resultDivided = document.getElementById(`imput-area`);
const tweetDivided = document.getElementById(`tweet-area`);

/**
* 指定した要素の子供を全削除する関数
* @param {HTMLElement} element HTML HTMLの要素
*/
function removeAllchildren(element){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}


assessmentButton.onclick = () => {
    /**
     * TODO 診断結果表示エリアの作成
     * TODO ツイートエリアの作成
     */
    const userName = userNameInput.value;
    if(!userName){
        return;//直ちに処理を完了するためのガード句
    }

        //HTMLにタグを足していく、ヘッダとパラグラフ
    removeAllchildren(resultDivided);   //消す
    const header = document.createElement(`h3`);    //定数header を宣言し、<h3>タグをつくって代入している
    header.innerHTML = `診断結果`;      //定数headerの.innerHTMLプロパティに文字列`診断結果`を書き込み
    resultDivided.appendChild(header);  //resultDividedに.appendChild()で子要素paragraphを足している

    const paragraph = document.createElement(`p`);  //定数paragraph を宣言し、<p>タグをつくって代入している
    const result = assessment(userName);    //定数result定数を作ってassessment()関数の引数userNameの戻り値を代入している
    paragraph.innerText = result;   //定数pargraphのinnerTextプロパティに定数resultの値を代入している
    resultDivided.appendChild(paragraph);   //resultDividedに.appendChild()で子要素paragraphを足している

    removeAllchildren(tweetDivided);   //tweetDidedの子要素を全て消す
    const anchor = document.createElement(`a`); //定数anchor を宣言し、<a>タグをつくって代入している
    const hrefValue = `https://twitter.com/intent/tweet?button_hashtag=`
        + encodeURIComponent(`あなたのいいところ`)
        + `&ref_src=twsrc%5Etfw`;

    /**
     * 定数hrefValue を宣言し、twitterのhrefアドレスを代入している
     */

    anchor.setAttribute(`href`,hrefValue);  //.setAttribute()でanchorに`href`属性を追加し,hrefValueを代入している
    anchor.className = `twitter-hashtag-button`;    //.classNameプロパティに
    anchor.setAttribute(`data-text`,result);  //.setAttribute()でanchorに`data-text`属性を追加し,`診断結果の文章`を代入している
    anchor.innerText = `Tweet #あなたのいいところ`; //.innerTextプロパティを`Tweet #あなたのいいところ`に書き換えている
    tweetDivided.appendChild(anchor);   //tweetDivided定数に.appendChild()で子要素anchorを追加している
    /*twttr.widgets.load();
    */

    const script = document.createElement(`script`);
    script.setAttribute(`src`,`https://platform.twitter.com/widgets.js`);
    script.setAttribute(`charset`,`UTF-8`);
    script.setAttribute(`async`,`async`);
    tweetDivided.appendChild(script);
}

userNameInput.onkeydown = (event) =>{
    if (event.key === `Enter`){
        assessmentButton.onclick();
        // TODO ボタンのonclick()処理を呼び出す
    }
};


const answers = [
    `{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。`,
    `{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。`,
    `{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。`,
    `{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。`,
    `{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。`,
    `{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。`,
    `{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。`,
    `{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。`,
    `{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。`,
    `{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。`,
    `{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。`,
    `{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。`,
    `{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。`,
    `{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。`,
    `{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。`,
    `{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。`,
    `{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされて♨️います。`,
];

/**
* assessment()は名前の文字列を渡すと診断結果を返す関数。
* @param {string} userName ユーザーネーム
* @return {string} 診断結果
*/

/**
* 動作内容は全文字のコード番号を取得して足し合わせる
*/

function assessment(userName) {
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode += userName.charCodeAt(i);
    }

    /**
     * 文字列コードの合計が大きいので、合計を
     * 回答数の長さで割って余りを出す
     */

    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    result = result.replace(/\{userName\}/g, userName);

    return result;
}
