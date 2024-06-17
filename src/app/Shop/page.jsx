
"use client"

import  React, { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useRouter } from "next/navigation"

export default function Component() {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const router = useRouter();
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Cozy Blanket",
      price: 29.99,
      quantity: 1,
      image: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Autumn Mug",
      price: 12.99,
      quantity: 2,
      image: "/placeholder.svg",
    },
  ])
  const handleAddToCart = (product) => {
    setCart([...cart, product])
    setIsQuickViewOpen(false)
  }
  const handleUpdateCartQuantity = (id, quantity) => {
    setCart(cart.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }
  const handleRemoveFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id))
  }
  const handleCheckout = () => {
    setIsCartOpen(false)
    setIsCheckoutOpen(true)
  }
  const handlelogout = () =>{
    router.push("/")
  }
  return (
    <>
      <Dialog open={isQuickViewOpen} onOpenChange={setIsQuickViewOpen} defaultOpen>
        <DialogContent className="sm:max-w-[600px]">
          <div className="grid md:grid-cols-2 gap-6">
            <img
              src="/placeholder.svg"
              alt="Product Image"
              width={400}
              height={400}
              className="rounded-lg object-cover w-full aspect-square"
            />
            <div className="grid gap-4">
              <div>
                <h2 className="text-2xl font-bold">Cozy Blanket</h2>
                <p className="text-gray-500 dark:text-gray-400">Warm and Soft for Chilly Nights</p>
              </div>
              <div className="text-3xl font-bold">$29.99</div>
              <Button
                onClick={() =>
                  handleAddToCart({
                    id: 1,
                    name: "Cozy Blanket",
                    price: 29.99,
                    quantity: 1,
                    image: "/placeholder.svg",
                  })
                }
              >
                Add to Cart
              </Button>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>
                  This cozy blanket is made from a blend of 60% combed ringspun cotton and 40% polyester, ensuring a
                  soft and breathable fabric that feels gentle against the skin.
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Shopping Cart</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
                <XIcon className="h-6 w-6" />
              </Button>
            </div>
            <div className="grid gap-4">
              {cart.map((item) => (
                <div key={item.id} className="grid grid-cols-[80px_1fr_auto] items-center gap-4">
                  <img
                    src="/placeholder.svg"
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                  <div className="grid gap-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleUpdateCartQuantity(item.id, item.quantity - 1)}
                    >
                      <MinusIcon className="h-4 w-4" />
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleUpdateCartQuantity(item.id, item.quantity + 1)}
                    >
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleRemoveFromCart(item.id)}>
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div className="text-lg font-bold">
                Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
              </div>
              <div className="flex flex-col gap-2 md:flex-row md:gap-4">
                <Button variant="outline" onClick={() => setIsCartOpen(false)}>
                  Continue Shopping
                </Button>
                <Button onClick={handleCheckout}>Checkout</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Checkout</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsCheckoutOpen(false)}>
                <XIcon className="h-6 w-6" />
              </Button>
            </div>
            <div className="grid gap-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="First Last" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" placeholder="Street, City, State, Zip" />
                </div>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input id="card-number" placeholder="0000 0000 0000 0000" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="expiry">Expiry</Label>
                    <Select>
                      <SelectTrigger id="expiry">
                        <SelectValue placeholder="MM/YY" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="01/24">01/24</SelectItem>
                        <SelectItem value="02/24">02/24</SelectItem>
                        <SelectItem value="03/24">03/24</SelectItem>
                        <SelectItem value="04/24">04/24</SelectItem>
                        <SelectItem value="05/24">05/24</SelectItem>
                        <SelectItem value="06/24">06/24</SelectItem>
                        <SelectItem value="07/24">07/24</SelectItem>
                        <SelectItem value="08/24">08/24</SelectItem>
                        <SelectItem value="09/24">09/24</SelectItem>
                        <SelectItem value="10/24">10/24</SelectItem>
                        <SelectItem value="11/24">11/24</SelectItem>
                        <SelectItem value="12/24">12/24</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Order Summary</h3>
                <div className="text-lg font-bold">
                  ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                </div>
              </div>
              <div className="grid gap-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src="/placeholder.svg"
                        alt={item.name}
                        width={40}
                        height={40}
                        className="rounded-lg object-cover"
                      />
                      <div className="grid gap-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-gray-500 dark:text-gray-400">
                          ${item.price.toFixed(2)} x {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <Button variant="outline" onClick={() => setIsCheckoutOpen(false)}>
                Cancel
              </Button>
              <Button>Place Order</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex gap-4">
        <Button onClick={() => setIsQuickViewOpen(true)}>Quick View</Button>
        <Button onClick={() => setIsCartOpen(true)}>Cart</Button>
        <Button onClick={() => setIsCheckoutOpen(true)}>Checkout</Button>
        <Button onClick={handlelogout}>Logout</Button>
      </div>


    </>
  )
}

function MinusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  )
}


function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}