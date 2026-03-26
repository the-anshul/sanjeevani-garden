"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, ArrowLeft, ShoppingCart, Star, Truck, Shield, Heart, X, Plus, Minus } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import LanguageToggle from "@/components/language-toggle"

export default function ShopPage() {
  const { t } = useLanguage()
  const [cart, setCart] = useState<any[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [checkoutStatus, setCheckoutStatus] = useState<"idle" | "processing" | "success">("idle")

  const plants = [
    {
      id: 1,
      name: t("tulsi"),
      scientificName: "Ocimum tenuiflorum",
      price: 299,
      originalPrice: 399,
      image: "/placeholder-l9a54.png",
      rating: 4.8,
      reviews: 156,
      inStock: true,
      benefits: [t("tulsiBenefit"), t("tulsiBoostsImmunity"), t("tulsiReducesStress")],
      size: t("mediumPot"),
      delivery: t("freeDelivery"),
    },
    {
      id: 2,
      name: t("neem"),
      scientificName: "Azadirachta indica",
      price: 349,
      originalPrice: 449,
      image: "/neem-tree-leaves-medicinal-plant.jpg",
      rating: 4.7,
      reviews: 203,
      inStock: true,
      benefits: [t("neemBenefit"), t("neemAntibacterial"), t("neemSkinHealth")],
      size: t("largePot"),
      delivery: t("freeDelivery"),
    },
    {
      id: 3,
      name: t("ashwagandha"),
      scientificName: "Withania somnifera",
      price: 399,
      originalPrice: 499,
      image: "/ashwagandha-root-medicinal-herb.jpg",
      rating: 4.9,
      reviews: 89,
      inStock: true,
      benefits: [t("ashwagandhaBenefit"), t("ashwagandhaReducesStress"), t("ashwagandhaBoostsEnergy")],
      size: t("mediumPot"),
      delivery: t("freeDelivery"),
    },
    {
      id: 4,
      name: t("aloeVera"),
      scientificName: "Aloe barbadensis",
      price: 199,
      originalPrice: 299,
      image: "/aloe-vera-succulent-plant-healing.jpg",
      rating: 4.6,
      reviews: 312,
      inStock: true,
      benefits: [t("aloeVeraBenefit"), t("aloeVeraSkinHealing"), t("aloeVeraDigestiveHealth")],
      size: t("smallPot"),
      delivery: t("freeDelivery"),
    },
    {
      id: 5,
      name: t("turmeric"),
      scientificName: "Curcuma longa",
      price: 249,
      originalPrice: 349,
      image: "/turmeric-root-golden-spice-medicinal.jpg",
      rating: 4.5,
      reviews: 178,
      inStock: true,
      benefits: [t("turmericBenefit"), t("turmericAntiInflammatory"), t("turmericAntioxidant")],
      size: t("mediumPot"),
      delivery: t("freeDelivery"),
    },
    {
      id: 6,
      name: t("brahmi"),
      scientificName: "Bacopa monnieri",
      price: 329,
      originalPrice: 429,
      image: "/brahmi-bacopa-monnieri-herb-brain-health.jpg",
      rating: 4.7,
      reviews: 94,
      inStock: true,
      benefits: [t("brahmiBenefit"), t("brahmiEnhancesMemory"), t("brahmiReducesAnxiety")],
      size: t("mediumPot"),
      delivery: t("freeDelivery"),
    },
    {
      id: 7,
      name: t("mintPlant"),
      scientificName: "Mentha spicata",
      price: 149,
      originalPrice: 199,
      image: "/fresh-mint-plant-in-pot.jpg",
      rating: 4.4,
      reviews: 267,
      inStock: true,
      benefits: [t("mintBenefit"), t("mintDigestive"), t("mintRefreshing")],
      size: t("smallPot"),
      delivery: t("freeDelivery"),
    },
    {
      id: 8,
      name: t("gingerPlant"),
      scientificName: "Zingiber officinale",
      price: 279,
      originalPrice: 379,
      image: "/ginger-plant-with-roots-in-pot.jpg",
      rating: 4.6,
      reviews: 145,
      inStock: false,
      benefits: [t("gingerBenefit"), t("gingerDigestive"), t("gingerAntiNausea")],
      size: t("mediumPot"),
      delivery: t("freeDelivery"),
    },
  ]

  const addToCart = (plant: any) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === plant.id)
      if (existing) {
        return prev.map((item) => (item.id === plant.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...plant, quantity: 1 }]
    })
    setIsCartOpen(true)
  }

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) => prev.map((item) => {
      if (item.id === id) {
        const newQ = item.quantity + delta
        return newQ > 0 ? { ...item, quantity: newQ } : item
      }
      return item
    }))
  }

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  const handleCheckout = () => {
    setCheckoutStatus("processing")
    setTimeout(() => {
      setCheckoutStatus("success")
      setCart([])
      setTimeout(() => {
        setCheckoutStatus("idle")
        setIsCartOpen(false)
      }, 3000)
    }, 1500)
  }

  const goBack = () => {
    window.history.back()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-emerald-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={goBack} className="text-emerald-700 hover:text-emerald-800">
                <ArrowLeft className="h-5 w-5 mr-2" />
                {t("backToHome")}
              </Button>
              <div className="flex items-center space-x-2">
                <Leaf className="h-6 w-6 text-emerald-600" />
                <span className="text-lg font-bold text-emerald-800">{t("plantShop")}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <LanguageToggle />
              <Button
                variant="outline"
                className="relative border-emerald-300 text-emerald-700 hover:bg-emerald-50 bg-transparent"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {t("cart")} 
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right-full duration-300">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold text-emerald-800 flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" /> Your Cart
              </h2>
              <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 && checkoutStatus === "idle" ? (
                <div className="text-center py-12 text-gray-500">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Your cart is empty</p>
                </div>
              ) : checkoutStatus === "success" ? (
                <div className="text-center py-12 text-emerald-600 animate-in fade-in zoom-in duration-300">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Order Placed Successfully!</h3>
                  <p className="text-gray-600 text-sm">Thank you for shopping with Sanjeevani Garden. You will receive an email confirmation shortly.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-gray-800">{item.name}</h4>
                          <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500">
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-sm font-bold text-emerald-600 mt-1">₹{item.price * item.quantity}</p>
                        
                        <div className="flex items-center gap-3 mt-2">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-gray-300 shadow-sm hover:bg-gray-100"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-gray-300 shadow-sm hover:bg-gray-100"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && checkoutStatus !== "success" && (
              <div className="p-4 border-t bg-gray-50">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Delivery</span>
                    <span className="text-emerald-600">Free</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg text-gray-800 pt-2 border-t">
                    <span>Total</span>
                    <span>₹{cartTotal}</span>
                  </div>
                </div>
                <Button 
                  onClick={handleCheckout} 
                  disabled={checkoutStatus === "processing"}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg h-12 text-lg"
                >
                  {checkoutStatus === "processing" ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    "Proceed to Checkout"
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-green-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl">🌿</div>
          <div className="absolute bottom-10 right-10 text-6xl">🏠</div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">🌱 {t("shopMedicinalPlants")}</h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto text-pretty leading-relaxed">
            {t("shopDescription")}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
              <Truck className="h-4 w-4 mr-2" />
              {t("freeDelivery")}
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
              <Shield className="h-4 w-4 mr-2" />
              {t("qualityGuarantee")}
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
              <Heart className="h-4 w-4 mr-2" />
              {t("organicGrown")}
            </Badge>
          </div>
        </div>
      </section>

      {/* Plants Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-emerald-800 mb-4">{t("availablePlants")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">{t("availablePlantsDesc")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {plants.map((plant) => (
              <Card
                key={plant.id}
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-emerald-100 bg-white overflow-hidden"
              >
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={plant.image || "/placeholder.svg"}
                    alt={plant.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {!plant.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="destructive" className="text-sm font-semibold">
                        {t("outOfStock")}
                      </Badge>
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-emerald-600 text-white">
                      {Math.round(((plant.originalPrice - plant.price) / plant.originalPrice) * 100)}% {t("off")}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg text-emerald-800 mb-1">{plant.name}</CardTitle>
                      <p className="text-xs text-gray-500 italic">{plant.scientificName}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{plant.rating}</span>
                      <span className="text-xs text-gray-500">({plant.reviews})</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    {plant.benefits.slice(0, 2).map((benefit, index) => (
                      <p key={index} className="text-xs text-gray-600 leading-relaxed">
                        • {benefit}
                      </p>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{plant.size}</span>
                    <span className="text-green-600 font-medium">{plant.delivery}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-emerald-700">₹{plant.price}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">₹{plant.originalPrice}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => addToCart(plant)}
                    disabled={!plant.inStock}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold disabled:bg-gray-300"
                  >
                    {plant.inStock ? (
                      <>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {t("addToCart")}
                      </>
                    ) : (
                      t("outOfStock")
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-emerald-800 mb-2">{t("freeDelivery")}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t("freeDeliveryDesc")}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">{t("qualityGuarantee")}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t("qualityGuaranteeDesc")}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-teal-800 mb-2">{t("organicGrown")}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t("organicGrownDesc")}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
