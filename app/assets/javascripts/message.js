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
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight})
    })
    .fail(function(){
      alert('メッセージを入力してください')
    })
    .always(function(){
      $('.submit-btn').prop('disabled', false)
    })
  })
})