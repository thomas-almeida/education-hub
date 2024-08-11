
function generateUniqueId(users) {
  let id = -1
  do {
      id++
  } while (users.some(user => user.id === id))
  return id
}

function generateExtenseId(users) {

  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';

  let userId = ''

  do {
      for (let i = 0; i < 6; i++) {
          const randomLetter = Math.floor(Math.random() * letters.length)
          userId += letters[randomLetter]
      }

      for (let i = 0; i < 3; i++) {
          const randomNumber = Math.floor(Math.random() * numbers.length)
          userId += numbers[randomNumber]
      }
  } while (users.some(user => user.id === userId))

  return userId
}

export default {
  generateUniqueId,
  generateExtenseId
}