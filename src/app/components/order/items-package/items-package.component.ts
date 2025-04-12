import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

interface InventoryItem {
  id: string
  name: string
  category: string
  stock: number
  maxStock: number
  image: string
}

@Component({
  selector: "app-items-package",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./items-package.component.html",
  styleUrls:["./items-package.component.scss"] ,
})
export class ItemsPackageComponent {
  searchTerm = ""

  inventoryItems: InventoryItem[] = [
    {
      id: "1",
      name: "Chair",
      category: "Furniture",
      stock: 97,
      maxStock: 100,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-p5WrSYPpTL9y5Zo0uqMLXbMIBT2JDF.png",
    },
    {
      id: "2",
      name: "Laptop",
      category: "Electronics",
      stock: 52,
      maxStock: 100,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-p5WrSYPpTL9y5Zo0uqMLXbMIBT2JDF.png",
    },
    {
      id: "3",
      name: "Frozen Food",
      category: "Food",
      stock: 13,
      maxStock: 100,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-p5WrSYPpTL9y5Zo0uqMLXbMIBT2JDF.png",
    },
    {
      id: "4",
      name: "T-shirt",
      category: "Clothing",
      stock: 82,
      maxStock: 100,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-p5WrSYPpTL9y5Zo0uqMLXbMIBT2JDF.png",
    },
    {
      id: "5",
      name: "Laptop",
      category: "Electronics",
      stock: 31,
      maxStock: 100,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-p5WrSYPpTL9y5Zo0uqMLXbMIBT2JDF.png",
    },
  ]

  get filteredItems(): InventoryItem[] {
    if (!this.searchTerm.trim()) {
      return this.inventoryItems
    }

    const term = this.searchTerm.toLowerCase()
    return this.inventoryItems.filter(
      (item) => item.name.toLowerCase().includes(term) || item.category.toLowerCase().includes(term),
    )
  }
}
