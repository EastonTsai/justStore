
export const checkProductData = (
  data: any
) => {
  if (
    data.title.trim().length <= 0 ||
    data.introduce.trim().length <= 0 ||
    data.price.trim().length <= 0 ||
    data.options.length <= 0
  ) {
    return false
  } else {
    return true
  }
}
