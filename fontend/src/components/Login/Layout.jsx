export const metadata = {
    title: "Auth Page",
    description: "Login and Registration Page",
  }
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    )
  }
  