var mForm = document.querySelector('form');
mForm.addEventListener('submit', submitFunc);
async function submitFunc(e) {
e.preventDefault();
var post = await fetch(this.domain.value, {
    "method": "post",
    "body": new FormData(this)
  });
document.body.append(post.ok);
var result = await post.json();
document.body.append(result.url);
this.reset();
return false;
}