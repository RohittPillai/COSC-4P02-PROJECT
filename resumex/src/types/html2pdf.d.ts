declare module 'html2pdf.js' {
  interface Html2PdfOptions {
    margin?: number;
    filename?: string;
    image?: { type: string; quality: number };
    html2canvas?: { scale: number };
    jsPDF?: { unit: string; format: string; orientation: string };
  }

  interface Html2PdfResult {
    from: (element: HTMLElement) => {
      set: (options: Html2PdfOptions) => {
        save: () => void;
      };
    };
  }

  function html2pdf(): Html2PdfResult;
  export default html2pdf;
} 