export default interface IEnvelope {
  id: number;
  title: string;
  lockEnd: Date;
  amount: number;
  isWithdrawn: boolean;
}