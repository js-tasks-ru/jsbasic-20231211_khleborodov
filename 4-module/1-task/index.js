function makeFriendsList(friends) {
  let ul = document.createElement('ul');
  for (let friend of friends) {
    const {firstName, lastName} = friend;
    ul.insertAdjacentHTML('beforeEnd', `<li>${firstName} ${lastName}</li>`)
  }
  
  return ul;
}
