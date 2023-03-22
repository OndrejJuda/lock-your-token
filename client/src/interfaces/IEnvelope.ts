export default interface IEnvelope {
  id: string;
  title: string;
  lockEnd: Date;
  amount: number;
  isWithdrawn: boolean;
}