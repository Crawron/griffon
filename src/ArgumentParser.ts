type Splitter = (args: string) => string[]
type ArgumentParser<T> = (arg: string) => T | undefined

type Argument<T> = {
  name: string | undefined
  required: boolean
  parse: ArgumentParser<T>
}

const num: (name?: string) => Argument<number> = () => {
  return {
    name,
    required: false,
    parse: arg => {
      return Number(arg)
    },
  }
}
