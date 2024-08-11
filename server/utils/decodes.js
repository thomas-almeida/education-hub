const charMap = {
  'a': '1', 'b': '2', 'c': '3', 'd': '4', 'e': '5',
  'f': '6', 'g': '7', 'h': '8', 'i': '9', 'j': '0',
  'k': 'A', 'l': 'B', 'm': 'C', 'n': 'D', 'o': 'E',
  'p': 'F', 'q': 'G', 'r': 'H', 's': 'I', 't': 'J',
  'u': 'K', 'v': 'L', 'w': 'M', 'x': 'N', 'y': 'O',
  'z': 'P', 'A': 'Q', 'B': 'R', 'C': 'S', 'D': 'T',
  'E': 'U', 'F': 'V', 'G': 'W', 'H': 'X', 'I': 'Y',
  'J': 'Z', 'K': 'a', 'L': 'b', 'M': 'c', 'N': 'd',
  'O': 'e', 'P': 'f', 'Q': 'g', 'R': 'h', 'S': 'i',
  'T': 'j', 'U': 'k', 'V': 'l', 'W': 'm', 'X': 'n',
  'Y': 'o', 'Z': 'p', '0': 'q', '1': 'r', '2': 's',
  '3': 't', '4': 'u', '5': 'v', '6': 'w', '7': 'x',
  '8': 'y', '9': 'z'
};

function encrypt(input) {
  return input.split('').map(char => charMap[char] || char).join('');
}

export default {
  encrypt,
}