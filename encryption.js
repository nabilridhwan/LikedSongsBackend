let encryptToken = (token) => {
    let e = []
    let splittedToken = token.split('');
    splittedToken.forEach((letter, index) => {

        // Change capital letters first
        if(keySet.fromCapitalLetters.includes(letter)){
            let indexFound = keySet.fromCapitalLetters.indexOf(letter)
            e[index] = keySet.toCapitalLetters[indexFound]
        }else if(keySet.fromNumbers.includes(letter)){
            let indexFound = keySet.fromNumbers.indexOf(letter)
            e[index] = keySet.toNumbers[indexFound]
        }else{
            e[index] = letter
        }


    })

    console.log(e.join(''))
}

let keySet = {
    fromCapitalLetters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    toCapitalLetters: ['Z', 'Y', 'X', 'W', 'V', 'U', 'T', 'S', 'R', 'Q', 'P', 'O', 'N', 'M', 'L', 'K', 'J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'],
    fromNumbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    toNumbers: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
}

console.log(encryptToken('BQDTZMWHIzV1JGYZnODmc84QArsqNKqXMoEjAgpARYoh_fL3BYiOH0Pjk0UA3noFYjDlRSAfeEFtyaJXXLX-gt5klMVXkYvWnUpZ9DOnRfgVOJVdch-ykKLB4PPTdTEtvnTEmY6Kt0MFsW4A6HVMGsZQk3pnnGn9TYjPQPpT28O--g'))