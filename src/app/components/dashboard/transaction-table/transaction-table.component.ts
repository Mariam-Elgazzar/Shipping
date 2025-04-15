import { Component, Input } from "@angular/core"
import { CommonModule } from "@angular/common"

interface Transaction {
  id: string
  category: string
  date: string
  origin: string
  destination: string
  weight: string
  status: "Delivery" | "Pending" | "Cancelled"
}

@Component({
  selector: "app-transaction-table",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="transaction-container">
      <div class="transaction-header">
        <h2>Transaction</h2>
        <div class="transaction-actions">
          <div class="search-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" placeholder="Search something" />
          </div>
          <button class="filter-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            Filter
          </button>
        </div>
      </div>

      <div class="table-wrapper">
        <table class="transaction-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Category</th>
              <th>Dates</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Weight</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let transaction of transactions">
              <td>{{ transaction.id }}</td>
              <td>{{ transaction.category }}</td>
              <td>{{ transaction.date }}</td>
              <td>{{ transaction.origin }}</td>
              <td>{{ transaction.destination }}</td>
              <td>{{ transaction.weight }}</td>
              <td>
                <span class="status-badge" [ngClass]="transaction.status.toLowerCase()">
                  {{ transaction.status }}
                </span>
              </td>
              <td>
                <button class="action-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [
    `
    .transaction-container {
      width: 100%;
      background-color: white;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .transaction-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;

      h2 {
        font-size: 18px;
        font-weight: 600;
        color: #212b36;
        margin: 0;
      }
    }

    .transaction-actions {
      display: flex;
      gap: 8px;
    }

    .search-box {
      display: flex;
      align-items: center;
      gap: 8px;
      background-color: #f5f5f5;
      border-radius: 4px;
      padding: 8px 12px;

      svg {
        color: #637381;
      }

      input {
        border: none;
        background: none;
        outline: none;
        font-size: 14px;
        color: #212b36;
        width: 150px;

        &::placeholder {
          color: #637381;
        }
      }
    }

    .filter-button {
      display: flex;
      align-items: center;
      gap: 4px;
      background-color: #f5f5f5;
      border: none;
      border-radius: 4px;
      padding: 8px 12px;
      font-size: 14px;
      color: #212b36;
      cursor: pointer;

      &:hover {
        background-color: #e0e0e0;
      }
    }

    .table-wrapper {
      overflow-x: auto;
    }

    .transaction-table {
      width: 100%;
      border-collapse: collapse;

      th, td {
        padding: 12px 16px;
        text-align: left;
        font-size: 14px;
      }

      th {
        color: #637381;
        font-weight: 600;
        border-bottom: 1px solid #e0e0e0;
      }

      td {
        color: #212b36;
        border-bottom: 1px solid #f5f5f5;
      }
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;

      &.delivery {
        background-color: rgba(0, 167, 111, 0.1);
        color: #00a76f;
      }

      &.pending {
        background-color: rgba(255, 171, 0, 0.1);
        color: #ffab00;
      }

      &.cancelled {
        background-color: rgba(255, 77, 79, 0.1);
        color: #ff4d4f;
      }
    }

    .action-button {
      background: none;
      border: none;
      cursor: pointer;
      color: #637381;

      &:hover {
        color: #212b36;
      }
    }
  `,
  ],
})
export class TransactionTableComponent {
  @Input() transactions: Transaction[] = [
    {
      id: "#54581-2",
      category: "Fashions",
      date: "09/09/24",
      origin: "Jakarta, Ind",
      destination: "Bandung,Ind",
      weight: "8.9 kg",
      status: "Delivery",
    },
    {
      id: "#54581-3",
      category: "Fashions",
      date: "09/09/24",
      origin: "Jakarta, Ind",
      destination: "Bandung,Ind",
      weight: "8.9 kg",
      status: "Delivery",
    },
  ]
}
