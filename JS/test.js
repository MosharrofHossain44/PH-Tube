function getTimeString(second) {
    const hour = parseInt(second / 3600)
    const minute = parseInt((second % 3600) / 60)
    const remainingSecond = ((second % 3600) % 60)

    return `${hour}hrs ${minute}mnt ${remainingSecond}scn`

}


console.log(getTimeString(3665))