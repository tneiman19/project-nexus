const deleteAnswer = async function(event) {
    const answerId = event.target.getAttribute('data-answer-id');
  
        if (answerId) {
        await fetch(`/api/answers/:${answerId}`, {
            method: 'DELETE',
        });
    
        document.location.reload();
        }
    };
  
  document.querySelectorAll('.delete-answer').forEach((button) => {
    button.addEventListener('click', deleteAnswer);
});
