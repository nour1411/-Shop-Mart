
export function formatCurrency(num:number){
   return new Intl.NumberFormat("en-us",{
    style:"currency",
    currency:"EGP"
   }).format(num);
}