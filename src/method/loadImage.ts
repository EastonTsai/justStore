export const loadImage = async (file: File) => {
  const src = await new Promise<string>((resolve) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result as string)
    }
    reader.readAsDataURL(file)
  })
  return src
}