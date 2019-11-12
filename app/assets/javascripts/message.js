$(function(){
  function buildMessage(message){
    var html = `<div class='message'>
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
                  ${message.image.url ? `<img src = ${message.image.url} alt="投稿画像" class = 'lower-message_image'></img>` : ""}
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
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
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function(){
      alert('メッセージを入力してください');
      $('.submit-btn').prop('disabled', false);
    })
  })
})