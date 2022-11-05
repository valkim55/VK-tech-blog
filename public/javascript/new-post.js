async function newPostForm(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const contents = document.querySelector('input[name="post-contents"]').value;

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ title, contents }),
        headers: {'Content-Type': 'application/json'}
    });

    if(response.ok) {
        document.location.replace('/dashboard');
        //console.log('new post')
    } else {
        alert(response.statusTExt);
    }
};

document.querySelector('.new-post').addEventListener('submit', newPostForm);