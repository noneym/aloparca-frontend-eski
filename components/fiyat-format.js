export default function NumberWithCommaAndPoint(n) {
    const parts = n.toString().split(".");
    return parts[0].replace(",", ".") + (parts[1] ? `,${parts[1]}` : "");
  }