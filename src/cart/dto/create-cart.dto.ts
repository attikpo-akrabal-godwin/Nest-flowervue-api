export class CreateCartDto {
  products: [{ product: string; nbr: number }];
  buyer: string;
}
