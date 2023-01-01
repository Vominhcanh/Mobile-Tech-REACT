const randomCatAvatar = () => {
  const list = [
    "https://cdn-icons-png.flaticon.com/512/219/219986.png",
    "https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg",
    "https://png.pngtree.com/png-clipart/20190924/original/pngtree-vector-user-young-boy-avatar-icon-png-image_4827810.jpg",
    "https://cdn-icons-png.flaticon.com/512/219/219969.png",
  ];
  return list[Math.floor(Math.random() * list.length)];
};
module.exports = randomCatAvatar;
