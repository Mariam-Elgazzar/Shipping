// import { Component } from "@angular/core"
// import { CommonModule } from "@angular/common"
// import { FormsModule } from "@angular/forms"

// interface InventoryItem {
//   id: string
//   name: string
//   category: string
//   stock: number
//   maxStock: number
//   image: string
// }

// @Component({
//   selector: "app-items-package",
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: "./items-package.component.html",
//   styleUrls:["./items-package.component.scss"] ,
// })
// export class ItemsPackageComponent {
//   searchTerm = ""

//   inventoryItems: InventoryItem[] = [
//     {
//       id: "1",
//       name: "Chair",
//       category: "Furniture",
//       stock: 97,
//       maxStock: 100,
//       image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-p5WrSYPpTL9y5Zo0uqMLXbMIBT2JDF.png",
//     },
//     {
//       id: "2",
//       name: "Laptop",
//       category: "Electronics",
//       stock: 52,
//       maxStock: 100,
//       image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-p5WrSYPpTL9y5Zo0uqMLXbMIBT2JDF.png",
//     },
//     {
//       id: "3",
//       name: "Frozen Food",
//       category: "Food",
//       stock: 13,
//       maxStock: 100,
//       image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-p5WrSYPpTL9y5Zo0uqMLXbMIBT2JDF.png",
//     },
//     {
//       id: "4",
//       name: "T-shirt",
//       category: "Clothing",
//       stock: 82,
//       maxStock: 100,
//       image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-p5WrSYPpTL9y5Zo0uqMLXbMIBT2JDF.png",
//     },
//     {
//       id: "5",
//       name: "Laptop",
//       category: "Electronics",
//       stock: 31,
//       maxStock: 100,
//       image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-p5WrSYPpTL9y5Zo0uqMLXbMIBT2JDF.png",
//     },
//   ]

//   get filteredItems(): InventoryItem[] {
//     if (!this.searchTerm.trim()) {
//       return this.inventoryItems
//     }

//     const term = this.searchTerm.toLowerCase()
//     return this.inventoryItems.filter(
//       (item) => item.name.toLowerCase().includes(term) || item.category.toLowerCase().includes(term),
//     )
//   }
// }
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
  template: `
    <div class="items-package-container">
      <div class="items-header">
        <h3>Items Package</h3>
        <div class="search-box">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" placeholder="Search Item" [(ngModel)]="searchTerm">
        </div>
      </div>

      <div class="items-actions">
        <button class="add-item-btn">Add new item</button>
      </div>

      <div class="items-list">
        <div class="item-card" *ngFor="let item of filteredItems">
          <div class="item-image">
            <img [src]="item.image" [alt]="item.name">
          </div>
          <div class="item-details">
            <div class="item-name">{{ item.name }}</div>
            <div class="item-category">{{ item.category }}</div>
            <div class="stock-bar">
              <div class="stock-progress" [style.width.%]="(item.stock / item.maxStock) * 100"
                   [ngClass]="{'low': item.stock / item.maxStock < 0.3,
                              'medium': item.stock / item.maxStock >= 0.3 && item.stock / item.maxStock < 0.7,
                              'high': item.stock / item.maxStock >= 0.7}">
              </div>
            </div>
            <div class="stock-info">{{ item.stock }}</div>
          </div>
          <button class="edit-btn">Edit</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .items-package-container {
      background-color: white;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .items-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;

      h3 {
        font-size: 18px;
        font-weight: 600;
        color: #1e293b;
        margin: 0;
      }
    }

    .search-box {
      display: flex;
      align-items: center;
      gap: 8px;
      background-color: #f1f5f9;
      border-radius: 4px;
      padding: 8px 12px;
      width: 200px;

      svg {
        color: #64748b;
      }

      input {
        border: none;
        background: none;
        outline: none;
        font-size: 14px;
        color: #1e293b;
        width: 100%;

        &::placeholder {
          color: #64748b;
        }
      }
    }

    .items-actions {
      margin-bottom: 16px;
    }

    .add-item-btn {
      background-color: #064e3b;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;

      &:hover {
        background-color: #065f46;
      }
    }

    .items-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 16px;
    }

    .item-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      border-radius: 8px;
      border: 1px solid #e2e8f0;

      &:hover {
        background-color: #f8fafc;
      }
    }

    .item-image {
      width: 48px;
      height: 48px;
      border-radius: 8px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .item-details {
      flex: 1;
    }

    .item-name {
      font-size: 14px;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 4px;
    }

    .item-category {
      font-size: 12px;
      color: #64748b;
      margin-bottom: 8px;
    }

    .stock-bar {
      height: 4px;
      background-color: #e2e8f0;
      border-radius: 2px;
      margin-bottom: 4px;
    }

    .stock-progress {
      height: 100%;
      border-radius: 2px;

      &.low {
        background-color: #ef4444;
      }

      &.medium {
        background-color: #f59e0b;
      }

      &.high {
        background-color: #10b981;
      }
    }

    .stock-info {
      font-size: 12px;
      color: #64748b;
      text-align: right;
    }

    .edit-btn {
      background: none;
      border: none;
      color: #0284c7;
      font-size: 14px;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  `,
  ],
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
