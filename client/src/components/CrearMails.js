export default function crearMail(status, to, factura) {
  if (status === 6) {
    return {
      subject: `Factura ${factura.id} Liberada`,
      to,
      html: `<table>
              <tr>
                <td>
                  Se ha Liberado la Orden de Compra  : ${factura.id}
                </td>
              </tr>
              <tr>
                <td>
                    El Total de la O/Compra : ${factura.total}
                </td>
              </tr>
            </table>`,
    };
  }
  if (status === 4) {
    return {
      subject: `Factura ${factura.id} Completada`,
      to,
      html: `<table>
              <tr>
                <td>
                  Se ha Confeccionado la Orden de Compra  : ${factura.id}
                </td>
              </tr>
              <tr>
                <td>
                    El Total de la O/Compra : ${factura.total}
                </td>
              </tr>
            </table>`,
    };
  }
  if (status === 2) {
    return {
      subject: `Factura ${factura.id} Completada`,
      to,
      html: `<table style="margin:0 auto; width: 1000px; font-family: 'Arial', sans-serif;">
      <tr>
        <td style="padding:0 800px;">
          <p>Se ha Confeccionado la Orden de Compra : ${factura.id} el cual debe ser autorizado </p>
        </td>
      </tr>
      <tr>
        <td style="padding:0 800px;">
            <p>El Total de la O/Compra : ${factura.total}</p>
        </td>
      </tr>
    </table>
      `,
    };
  }
};

