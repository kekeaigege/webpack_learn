module.exports = function (content) {
    console.log(content);

    return content.replace(/\.console\.log\(.*\);?/g,"");
}
