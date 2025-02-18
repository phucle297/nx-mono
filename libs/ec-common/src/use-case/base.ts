export abstract class UseCaseInput {}
export abstract class UseCaseOutput {}

export abstract class UseCase<
  Input extends UseCaseInput,
  Output extends UseCaseOutput
> {
  abstract execute(
    input: Input | Input[],
    options?: unknown
  ):
    | Output
    | Output[]
    | Promise<Output>
    | Promise<Output[]>
    | void
    | Promise<void>
}
