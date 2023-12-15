const pagination = (page = {size: 15, number: 1}) => ({
    limit: parseInt(page.size), offset: parseInt(page.size) * (parseInt(page.number) - 1)
  })
  
const totalPage = (count, size = 15) => Math.ceil(count / size)


module.exports = {
   pagination,
   totalPage
}
