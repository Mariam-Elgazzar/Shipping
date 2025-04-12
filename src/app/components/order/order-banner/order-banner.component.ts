// import { Component } from "@angular/core"
// import { CommonModule } from "@angular/common"

// @Component({
//   selector: "app-order-banner",
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl:"./order-banner.component.html" ,
//   styleUrls: ["./order-banner.component.scss"],
// })
// export class OrderBannerComponent {}
import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-order-banner",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="banner-container">
      <div class="banner-content">
        <h2 class="banner-title">Let's Log In Now</h2>
        <h3 class="banner-subtitle">To Access Exclusive Features</h3>
        <p class="banner-description">Stay in the loop with important messages and updates tailored just for you</p>

        <button class="view-detail-btn">
          View Detail
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>

      <div class="banner-image">
        <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BI8iV7pG7zOJQGPbkvm456HFBNjnV0.png" alt="Green shipping container">
      </div>
    </div>
  `,
  styles: [
    `
    .banner-container {
      background-color: #e8f5e9;
      border-radius: 8px;
      padding: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      overflow: hidden;
      position: relative;
    }

    .banner-content {
      max-width: 60%;
      z-index: 1;
    }

    .banner-title {
      font-size: 28px;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 8px 0;
    }

    .banner-subtitle {
      font-size: 20px;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 16px 0;
    }

    .banner-description {
      font-size: 14px;
      color: #475569;
      margin-bottom: 24px;
    }

    .view-detail-btn {
      display: flex;
      align-items: center;
      gap: 8px;
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

    .banner-image {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 100%;
      display: flex;
      align-items: center;

      img {
        max-height: 100%;
        max-width: 300px;
        object-fit: contain;
      }
    }

    @media (max-width: 768px) {
      .banner-container {
        flex-direction: column;
        padding: 20px;
      }

      .banner-content {
        max-width: 100%;
        margin-bottom: 20px;
      }

      .banner-image {
        position: relative;
        right: auto;
        top: auto;
        transform: none;
        width: 100%;
        justify-content: center;

        img {
          max-width: 200px;
        }
      }
    }
  `,
  ],
})
export class OrderBannerComponent {}
