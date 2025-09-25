import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/Utilities/formatPrice';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import InnerCart from './_component/InnerCart/InnerCart';



export default function Cart() {
  return <>
 <InnerCart/>
  </>
}
