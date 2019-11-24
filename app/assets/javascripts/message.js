$(function(){
  function buildMessage(message){
    var image_html = `${message.image.url ? `<img src = ${message.image.url} alt="投稿画像" class = 'lower-message_image'></img>` : ""}`

    var html = `<div class='message' data-message-id=${message.id}>
                  <div class='message_info'>
                    <div class="message_info_talker">
                      ${message.user_name}
                    </div>
                    <div class="message_info_date">
                      ${message.created_at}
                    </div>
                  </div>
                  <p class="message_text">
                    ${message.content}
                  </p>
                  ${image_html}
                </div>`
    return html;
  }

  function reloadLastMessage(groupId) {
    let latest_message = $('.message').last().children()[1].textContent;
    let groups = document.getElementsByClassName("group");
    Array.prototype.forEach.call(groups, function(group){
      let group_message = group.children[0];
      if(group_message.getAttribute('href') == groupId){
        group_message.getElementsByClassName("group_latest-message")[0].textContent = latest_message;
      }
    })
  }

  var reloadMessages = function(){
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      last_message_id = $('.message').last().data("message-id");
      var group_num = (location.href).match(/\/groups\/(\d+)\/messages/);
      $.ajax({
        url: `/groups/${group_num[1]}/api/messages`,
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
         reloadLastMessage(group_num[0]);
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        messages.forEach(function (message){
          insertHTML = buildMessage(message); 
          $('.messages').append(insertHTML);
        })
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      alert('メッセージを入力してください');
    })
    .always(function(){
      $('.submit-btn').prop('disabled', false);
    })
  })

  if((location.href).match(/\/groups\/(\d+)\/messages/)){
    setInterval(reloadMessages, 7000);
  }
})
