const summaryCashReportPrintter = ({ 
    cashes,
    date,
    totalCashIn,
    totalCashOut,
    totalCashBeforePeriod,
    helpers,
  }) => {

  const month = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

  let dataCashes = '';
  let saldo = totalCashBeforePeriod || 0;

  cashes.forEach((cash, index) => {
    if (cash.type === 'cash-out') {
      saldo -= cash.amount; 
    } else {
      saldo += cash.amount;
    }

    dataCashes += `
      <tr>
        <td class="text-center">${ ++index }</td>
        <td class="text-center">${ cash.date.toISOString().substring(0, 10).replace(/\-/g, '/') }</td>
        <td>${ cash.description }</td>
        <td class="text-${ (cash.type === 'cash-in') ? 'right' : 'center' }">${ (cash.type === 'cash-in') ? `${helpers.currencyFormatter(cash.amount)},-` : '-' }</td>
        <td class="text-${ (cash.type === 'cash-out') ? 'right' : 'center' }">${ (cash.type === 'cash-out') ? `${helpers.currencyFormatter(cash.amount)},-` : '-' }</td>
        <td class="text-right">${ helpers.currencyFormatter(saldo) },-</td>
      </tr>
    `;
  });

  let showPeriod = '';
  if (JSON.stringify(date) !== '{}') {
    showPeriod += `Periode ${month[date.month - 1]} ${date.year}`;
  }

  let html = `
    <html>
      <head>
        <title>Laporan Rekapitulasi Kas</title>
        <style>
          body {
            color: #111;
            font-family: arial, sans-serif;
          }
          h1 {
            font-size: 22px;
          }
          .text-right {
            text-align: right;
          }
          .text-center {
            text-align: center;
          }
          .page {
            width: 96%;
            margin: auto;
          }
          .page-header {
            padding-top: 40px;
            padding-bottom: 40px;
          }
          table {
            width: 100%;
            margin: auto;
            border-collapse: collapse;
          }
          table td,
          table th {
            border: 1px solid #111;
            padding: 8px;
          }
          table th,
          table tfoot td {
            padding-top: 12px;
            padding-bottom: 12px;
          }
          table tfoot tr {
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="page">
          <div class="page-header">
            <h1 class="text-center">Laporan Rekapitulasi Pengeluaran dan Pemasukkan Kas</h1>
            <p class="text-center">${ showPeriod }</p>
          </div>
          <div class="page-body">
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Tanggal</th>
                  <th>Keterangan</th>
                  <th>Kas Masuk</th>
                  <th>Kas Keluar</th>
                  <th>Saldo</th>
                </tr>
              </thead>
              <tbody>
                ${ dataCashes }
              </tbody>
              <tfoot>
                <tr class="bg-light font-weight-bold">
                  <td class="text-center" colspan="3">Total</td>
                  <td class="text-right">${ helpers.currencyFormatter(totalCashIn) },-</td>
                  <td class="text-right">${ helpers.currencyFormatter(totalCashOut) },-</td>
                  <td class="text-right">${ helpers.currencyFormatter(saldo) },-</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </body>
    </html>
  `;

  return html;
};

module.exports = {
  summaryCashReportPrintter,
};
