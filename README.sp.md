[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)


# Plantilla de Excel para medición de cantidades (QTO) y BOQ de cimentaciones: listado automático de doblado de barras (BBS) de acero de refuerzo, volumen de concreto y estimador de costos
<img width="1049" height="790" alt="image" src="https://github.com/user-attachments/assets/55faa135-a626-40be-b88a-ee7264fbc96a" />


[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-green.svg)](#access)
[![Tool Type](https://img.shields.io/badge/Tool-Construction%20Estimation%20Software-orange.svg)](#what-it-helps-track)

**Una calculadora de cimentaciones de obra y plantilla Excel de estimación de costos lista para usar (.xlsx)** creada para principiantes, pequeños contratistas y técnicos de mediciones. Convierta al instante las dimensiones brutas de zapatas, pilotes, losas y vigas en **volúmenes de concreto ($m^3$), cantidades de excavación de tierras, áreas de encofrado ($m^2$), listados automáticos de doblado de barras (BBS) para el tonelaje de acero de refuerzo y listas de cantidades (BOQ) valorizadas** precisos—funcionando como una **alternativa de software de estimación civil** lista para usar que no exige arrastrar fórmulas a mano ni configurar macros.

<p align="center">
  <img width="1381" height="827" alt="Construction Foundation Quantity Takeoff QTO and BOQ Cost Estimation Excel Template Dashboard showing concrete volume and rebar weight calculations" src="https://github.com/user-attachments/assets/bf8dad7d-687c-48f0-a8ec-bf2cb4bda94e" />
</p>

> **Pruebe la calculadora en el navegador o descargue el libro de Excel offline permanente:**  
> Pruebe la lógica de cálculo al instante en su navegador, o descargue el **libro de trabajo de estimación de Microsoft Excel** desbloqueado y reutilizable para el almacenamiento local de proyectos, la presentación de ofertas a clientes, las pistas de auditoría financiera y la ejecución en temporadas de licitación intensas (respaldado por una garantía de devolución del dinero de 30 días).
>
> * [🌐 **Abrir la calculadora web gratuita de QTO de cimentaciones y acero de refuerzo en concreto** *(vista previa online instantánea — sin registro de cuenta ni instalación de software)*](https://hyvoid.github.io/Foundation-Quantity-Takeoff-BBS-BOQ-Cost-Estimation-Excel-Toolkit/)
> * [📥 **Descargar la plantilla Excel offline de BOQ, BBS y estimación de costos de cimentaciones (.xlsx)** *(flujo de trabajo SOP preconfigurado y fórmulas de actualización automática para proyectos comerciales ilimitados)*](https://theseusworkshop.com/l/ncaol?utm_source=github&utm_medium=GitHub%20README)

Diseñada para implementarse de inmediato: realice una medición rápida de la subestructura directamente en su navegador web, o descargue la hoja de cálculo local `.xlsx` para pegar las dimensiones de su propio proyecto y generar desgloses de costos listos para el cliente en segundos.

---

## Qué le ayuda a controlar: puntos de dolor en la medición de subestructuras y soluciones automatizadas en Excel

| Punto de dolor habitual en la estimación | Métrica de seguimiento de alta frecuencia | Solución de la plantilla Excel automatizada |
| :--- | :--- | :--- |
| **Cálculos fragmentados de cimentaciones y zapatas** | **Cantidades de elementos de subestructura** *(pilotes, cabezales de pilotes, zapatas aisladas, vigas de riostra, columnas, excavación de zanjas)* | Centraliza todas las **mediciones de cantidades de subestructura civil** en una única tabla de entrada unificada, eliminando las hojas de cálculo manuales separadas para cada tipo de elemento de concreto. |
| **Desconexión entre las dimensiones del plano y el volumen** | **Volumen de concreto ($m^3$), área de encofrado ($m^2$) y corte/relleno de tierras** | Vincula automáticamente las dimensiones geométricas de medición y el conteo de elementos provenientes de **PlanSwift, Bluebeam Revu, AutoCAD o planos PDF** con las fórmulas de volumen estructural y de encofrado. |
| **Detallado de acero de refuerzo complejo y lento** | **Calculadora de peso de acero y listado de doblado de barras (BBS) por diámetro de barra** | Genera automáticamente **longitudes de corte del acero de refuerzo, metros lineales totales, peso teórico del acero ($kg / tonnes$) y márgenes de desperdicio** ordenados por tamaño de barra (por ejemplo, de 10 mm a 32 mm). |
| **Errores de copiar y pegar durante la valorización de la licitación** | **Lista de cantidades valorizada (BOQ) y desglose de costos por división** | Traslada los totales calculados de movimiento de tierras, concreto, encofrado y acero directamente a un **cuadro BOQ comercial** estandarizado, multiplicando las cantidades por los precios unitarios de forma automática. |
| **Licitación a ciegas sin verificación de ratios de materiales** | **Intensidad de acero ($kg/m^3$) e indicadores clave de costo unitario** | Calcula en tiempo real la **densidad de refuerzo por metro cúbico de concreto ($kg/m^3$)** y la distribución de costos, lo que permite a principiantes y gerentes detectar al instante una oferta por debajo del costo o un pedido excesivo. |
| **Errores de entrada ocultos que arruinan el margen final de la oferta** | **Detección de errores previa a la oferta y alertas de auditoría de fórmulas** | Ejecuta **verificaciones automáticas de validación de datos** para señalar dimensiones de zapata faltantes, precios unitarios en cero, parámetros de acero no válidos o filas de BOQ sin vincular antes de presentar la licitación. |

---

## Tutorial de inicio rápido: cómo automatizar la medición y la estimación de costos de cimentaciones en 4 pasos

Aunque no tenga formación avanzada en Excel ni antecedentes formales en medición de cantidades, este kit de herramientas incluye un **flujo de trabajo con procedimiento operativo estándar (SOP) integrado**. La matemática de ingeniería subyacente y las reglas de vinculación comercial están preconfiguradas: solo debe seguir las pestañas numeradas, pegar sus mediciones brutas y leer la retroalimentación analítica instantánea.

### Paso 1: configurar los precios locales de materiales de construcción y los factores de desperdicio
Abra el panel de configuración de parámetros para inicializar su entorno de licitación. Introduzca su moneda local, los precios unitarios de **concreto estructural premezclado, excavación, encofrado de madera o acero y acero de refuerzo**, además de los márgenes estándar para el **desperdicio por corte de acero (%)** y los **factores de esponjamiento o contracción del suelo**.

### Paso 2: pegar las dimensiones brutas de su medición de cimentación (sin arrastrar fórmulas)
Copie y pegue los elementos de cimentación que haya medido—desde **Bluebeam, PlanSwift, CostX o mediciones manuales sobre planos PDF**—directamente en la tabla estructurada de entrada de datos. Introduzca el ID del elemento, la referencia del plano, la categoría de cimentación (pilote, cabezal de pilote, zapata, viga de riostra o columna), las dimensiones de largo/ancho/profundidad y los datos básicos de separación y diámetro de las barras.

### Paso 3: revisar los volúmenes de concreto, el BBS de acero y los informes de BOQ valorizados generados automáticamente
Observe cómo el motor de estimación calcula todo de forma simultánea. Como todas las reglas de búsqueda y las fórmulas de matriz dinámica están premapeadas dentro de la plantilla, **ni siquiera necesita hacer doble clic en el controlador de relleno de Excel ni arrastrar fórmulas hacia abajo por las filas**. Sus volúmenes de concreto, áreas de encofrado, el **listado de doblado de barras (BBS)** diámetro por diámetro, la **lista de cantidades (BOQ)** comercial y los **diagnósticos de intensidad de acero ($kg/m^3$)** se completan con un solo clic.

### Paso 4: descargar el libro de Excel reutilizable para las temporadas de licitación intensas
Cuando los ingenieros estructurales emitan revisiones de planos, adendas u órdenes de cambio (VO), simplemente sobrescriba las celdas de dimensiones modificadas o actualice un único precio unitario de material: cada tabla BBS y cada total de BOQ posteriores se actualizan automáticamente.

> **Deje de reconstruir hojas de cálculo desde cero en cada temporada de licitaciones:**  
> Las matemáticas de construcción y la verificación cruzada comercial son complejas, pero su flujo de trabajo diario no tiene por qué serlo. Con reglas de cálculo de coincidencia automática ya creadas, fórmulas dinámicas de actualización automática y un SOP integrado paso a paso, puede omitir por completo la depuración de fórmulas. Solo descargue el archivo en local, pegue los datos de su proyecto y obtenga retroalimentación comercial inmediata para mantenerse enfocado en ganar proyectos en lugar de pelear con hojas de cálculo rotas.
>
> 👉 **[📥 Descargar la plantilla Excel completa offline de medición de cimentaciones, BBS y BOQ (.xlsx) para uso local ilimitado](https://theseusworkshop.com/l/ncaol?utm_source=github&utm_medium=GitHub%20README)**

---

## La lógica comercial y la metodología: cómo resolver las fugas de rentabilidad ocultas en la licitación de cimentaciones

Para principiantes, estimadores junior y pequeños contratistas con la agenda apretada, la licitación de subestructuras es una de las fases de mayor riesgo de un proyecto de construcción. La mayoría de las pérdidas en licitaciones no se produce porque un estimador no sepa medir una zapata en un plano, sino por **puntos ciegos en el flujo de trabajo estructural** entre la medición y el precio final.

A continuación se presentan los tres riesgos comerciales objetivos que hacen perder dinero a los contratistas, y cómo la lógica comercial integrada en esta plantilla los elimina:

### 1. Eliminar el «impuesto de la transcripción manual» entre hojas desconectadas
* **El hecho objetivo:** En los flujos de trabajo tradicionales, los estimadores calculan el volumen de concreto en una hoja, estiman el peso del acero en un segundo archivo y escriben manualmente esos totales en una tercera hoja de lista de cantidades (BOQ) para la valorización. Los estudios de auditoría del sector muestran de forma consistente que las transferencias manuales entre celdas y las ediciones de `VLOOKUP` codificadas de forma rígida introducen una **discrepancia de cantidad o de precio del 3% al 8%**. Cuando los márgenes netos típicos de la contratación general se sitúan entre el **5% y el 10%**, una sola fila olvidada o un vínculo de fórmula roto elimina toda la utilidad del proyecto antes de mover la primera pala de tierra.
* **La solución integrada:** Este kit de herramientas impone una línea de datos lineal estricta con una única fuente de verdad:
  $$\text{Dimensiones medidas del plano} \longrightarrow \text{Geometría automatizada (Concreto / Encofrado / Movimiento de tierras)} \longrightarrow \text{BBS de acero vinculado} \longrightarrow \text{BOQ comercial valorizado} \longrightarrow \text{Validación automática de errores}$$
  Usted introduce las dimensiones brutas una sola vez. Cada cuadro comercial se alimenta directamente de esa única entrada.

### 2. Exponer el punto ciego de decisión de la «intensidad de acero ($kg/m^3$)»
* **El hecho objetivo:** Los principiantes casi siempre juzgan una estimación mirando únicamente el importe final de la última línea. Sin embargo, los directores comerciales experimentados auditan las estimaciones usando la **intensidad de refuerzo ($kg \text{ de acero por } m^3 \text{ de concreto}$)**. Si una zapata aislada comercial estándar o una viga de riostra suele requerir entre **80 y 130 $kg/m^3$** de acero, y su hoja de cálculo manual arroja por accidente **25 $kg/m^3$** (por un multiplicador de conteo de barras omitido) o **260 $kg/m^3$** (por un error de unidades de milímetro a metro), mirar solo el costo total ocultará el error. Con **25 $kg/m^3$**, gana la licitación pero sufre una pérdida financiera enorme al comprar acero en obra; con **260 $kg/m^3$**, su oferta queda sobrevalorada y se rechaza automáticamente.
* **La solución integrada:** El panel de control calcula y muestra automáticamente la **intensidad de acero global y por elemento ($kg/m^3$)** junto con el tonelaje total, lo que brinda a los usuarios novatos exactamente la misma visibilidad de diagnóstico que un técnico de mediciones sénior.

### 3. Proteger el flujo de caja frente al desperdicio de material y el esponjamiento del suelo no contabilizados
* **El hecho objetivo:** Pagar por el volumen geométrico exacto que figura en los planos estructurales CAD garantiza faltantes de material en obra. El acero de refuerzo requiere márgenes de desperdicio por corte y por empalme (habitualmente del **5% al 10%**), y el suelo excavado se expande al extraerlo (factores de esponjamiento o expansión de tierras del **15% al 30%**), lo que incide directamente en el número de camiones de transporte y en los costos de disposición.
* **La solución integrada:** Celdas de parámetros globales dedicadas aplican automáticamente los multiplicadores de desperdicio y esponjamiento a todas las partidas de BOQ relevantes, asegurando que su precio de licitación cubra el consumo real en obra y no la geometría neta teórica.

---

## Hojas de cálculo manuales de construcción frente al kit de Excel automatizado de medición de cimentaciones y BOQ

| Operación de estimación de obra | Flujo de trabajo tradicional con hoja de cálculo desde cero | Kit de Excel automatizado de QTO y BOQ para cimentaciones |
| :--- | :--- | :--- |
| **Trasladar las cantidades medidas a la valorización** | Las cantidades medidas del PDF se vuelven a teclear o se copian y pegan manualmente en una pestaña de valorización de BOQ separada, lo que genera un alto riesgo de desalineación de filas y de errores `#REF!`. | Las dimensiones de los elementos fluyen directamente al **motor de cálculo automatizado del BOQ** mediante referencias estructuradas dinámicas, sin ninguna transcripción manual. |
| **Calcular el peso del acero y las longitudes de corte** | Los estimadores calculan los listados de doblado de barras (BBS) en tablas aisladas usando fórmulas manuales $D^2 / 162$ que se rompen cuando cambian las dimensiones de la cimentación. | Los **parámetros de refuerzo (BBS)** están vinculados matemáticamente a la geometría del elemento y calculan automáticamente longitudes de barra, deducciones por doblez, pesos unitarios y totales por diámetro. |
| **Alternar entre tipos de elementos de subestructura** | Los usuarios hacen malabares con pestañas de calculadora separadas para pilotes perforados, cabezales de pilotes, zapatas aisladas, vigas de riostra, columnas de arranque y excavación de zanjas. | Las **etiquetas de categoría de elemento** integradas activan automáticamente la fórmula geométrica exacta que se requiere para el volumen de concreto, el área perimetral de encofrado y el movimiento de tierras. |
| **Gestionar revisiones y adendas de planos** | Cuando un ingeniero cambia la profundidad de una zapata o la resistencia del concreto, los estimadores pasan horas rastreando celdas codificadas de forma rígida en múltiples hojas. | Actualizar una sola fila de dimensiones o el **panel central de precios unitarios de materiales** recalcula al instante todos los pesos de BBS y los precios de licitación posteriores. |
| **Auditar la estimación antes de presentar la oferta** | Las dimensiones faltantes, las partidas sin precio o los rangos `SUM` rotos llegan habitualmente al paquete final de licitación del cliente sin que nadie los detecte. | Las **alertas de validación automatizadas** dedicadas resaltan en tiempo real la geometría incompleta, los precios en cero, las discrepancias de acero y las variaciones de conciliación del BOQ. |

---

## ¿Quién debería usar esta plantilla Excel de estimación de cimentaciones? (roles y casos de uso)

Este kit de herramientas está diseñado para profesionales de la construcción, contratistas especializados y principiantes que necesitan un puente inmediato y confiable entre la **medición de planos, el cálculo de acero y la valorización comercial**, sin pagar miles de dólares por un software ERP de estimación empresarial de gran envergadura:

* **Técnicos de mediciones (QS) junior e ingenieros de costos de nivel inicial:** Buscan una **plantilla Excel de lista de cantidades (BOQ)** estandarizada, con un SOP integrado que evite errores de cálculo vergonzosos y mantenga una pista de auditoría transparente para la revisión de sus superiores.
* **Pequeños contratistas generales y constructores de vivienda residencial:** Necesitan una **hoja de cálculo estimadora de costos de cimentación** rápida y apta para principiantes, con la que valorizar zapatas de viviendas, vigas de riostra y losas de concreto con precisión durante temporadas de licitación frenéticas, sin contratar a un estimador a tiempo completo.
* **Subcontratistas de concreto, encofrado y acero de refuerzo:** Buscan una **calculadora automática de peso de acero y una hoja Excel de listado de doblado de barras (BBS)** para convertir los planos estructurales en tonelaje de compra de acero y en ofertas competitivas de paquetes de especialidad en minutos.
* **Estimadores de ingeniería civil e ingenieros de obra:** Requieren una **alternativa ligera al software de medición de cantidades de ingeniería civil** para verificar las certificaciones de pago de los contratistas, contrastar los requerimientos de material en obra y controlar los ratios de intensidad concreto-acero ($kg/m^3$).
* **Gerentes de proyectos de construcción y representantes del propietario:** Utilizan una **plantilla estructurada de seguimiento del presupuesto de subestructura** para comparar cotizaciones de subcontratistas, evaluar opciones de ingeniería de valor y auditar el impacto en costos de las órdenes de cambio (VO).
* **Estudiantes de ingeniería civil, pasantes y estimadores independientes:** Aprenden **flujos de trabajo prácticos de medición y estimación de obra** mediante un modelo Excel transparente y de nivel productivo que conecta la geometría de los libros de texto con la licitación comercial del mundo real.

---

## Escenarios de construcción de alta frecuencia y aplicaciones para proyectos de nicho

* **Preparación rápida de licitaciones comerciales y paquetes de oferta:** Convierta las mediciones brutas exportadas desde **PlanSwift, Bluebeam Revu, Cubicost o planos de AutoCAD** en una **lista de cantidades (BOQ) de subestructura** totalmente valorizada y lista para el cliente en menos de 15 minutos.
* **Listado automático de doblado de barras (BBS) y compra de acero:** Genere listas de corte de refuerzo ordenadas por diámetro y resúmenes de tonelaje teórico ($kg$ y toneladas métricas) para pedidos de fabricación de acero, sin complementos complejos de detallado CAD.
* **Valorización de revisiones de planos, adendas y órdenes de cambio (VO):** Cuantifique al instante el delta exacto de costo y de material cuando los ingenieros estructurales revisan cabezales de pilotes, profundizan excavaciones de zapatas o modifican la separación de las barras de refuerzo a mitad del proyecto.
* **Auditoría de cotizaciones de subcontratistas y verificación de referencias:** Utilice el **indicador automático de intensidad de refuerzo ($kg/m^3$)** y el desglose por precio unitario para detectar ofertas infladas de subcontratistas o cotizaciones anormalmente bajas antes de firmar los subcontratos.
* **Estudios preliminares de viabilidad y presupuestación conceptual de subestructuras:** Introduzca las dimensiones estructurales de referencia y los precios locales de materiales para establecer estimaciones de costo de cimentación defendibles en etapas tempranas, tanto para desarrollos residenciales como comerciales o industriales.

*(Aviso de ingeniería: este kit de herramientas está diseñado para automatizar la matemática de la medición de cantidades, la agregación de BBS y la valorización comercial del BOQ. No sustituye al software con licencia de diseño estructural, como ETABS, STAAD.Pro o SAFE. Los usuarios deben verificar siempre las reglas de detallado del refuerzo, las longitudes de empalme, los factores de desperdicio y los precios unitarios frente a los planos estructurales específicos del proyecto, los códigos de construcción locales y las condiciones geotécnicas del sitio.)*

---

## Acerca de Theseus Workshop: kits de Excel prácticos para el apoyo a decisiones y las operaciones

Creo **plantillas Excel ligeras y listas para producción, además de herramientas de apoyo a decisiones basadas en el navegador**, para flujos de trabajo operativos y comerciales que tienen demasiadas piezas móviles como para gestionarlas de forma confiable en una hoja de cálculo improvisada o en la cabeza de alguien.

Cada kit de herramientas de **Theseus Workshop** se construye en torno a un principio de ingeniería fundamental:

> **¿Qué información crítica debe estar conectada en un solo lugar para que usted pueda tomar la próxima decisión comercial con el 100% de confianza?**

Este **kit de medición de cantidades (QTO), BBS y estimación de costos BOQ para cimentaciones** aplica ese principio a la licitación de subestructuras civiles: conecta las dimensiones brutas de los planos, las cantidades de concreto, movimiento de tierras y encofrado, el detallado del acero, la valorización comercial y la validación de errores en un flujo de trabajo SOP repetible y a prueba de principiantes.

### Explore más kits de herramientas de negocio e ingeniería listos para usar
* 🛒 **[Visite la tienda oficial de Theseus Workshop (`theseusworkshop.com`)](https://theseusworkshop.com)** — Explore nuestro catálogo completo de plantillas Excel listas para usar, modelos automatizados de análisis comercial y kits de herramientas SOP operativos diseñados para ahorrar horas de trabajo manual en hojas de cálculo.
* 📥 **[Obtenga aquí la plantilla Excel offline de QTO, BBS y estimación de costos BOQ para cimentaciones](https://theseusworkshop.com/l/ncaol?utm_source=github&utm_medium=GitHub%20README)** — Descarga digital instantánea (.xlsx) con acceso de por vida y garantía de devolución del dinero de 30 días.

## Detalles técnicos

<details>
<summary>Para revisores técnicos, usuarios avanzados de Excel y colaboradores</summary>

### Arquitectura del libro de trabajo

El libro de trabajo está estructurado como una cadena de cálculo controlada de seis hojas:

| Hoja | Función | Resultado principal |
|---|---|---|
| `01_Parameters` | Configuración central de parámetros | Moneda, precios de materiales, constante de refuerzo, margen de desperdicio, factor de movimiento de tierras |
| `02_Qty_Input` | Capa principal de entrada de datos | Cantidades de elementos, volumen de concreto, área de encofrado, entrada de refuerzo |
| `03_Reinforcement_Engine` | Motor de cálculo de refuerzo | Longitud de corte, número de barras, metros lineales, peso teórico, toneladas totales |
| `04_BOQ_Summary` | Agregación comercial | Cantidades del BOQ, precios unitarios, importes por partida, costo total estimado |
| `05_Cost_Dashboard` | Análisis de gestión | Costo total, cantidades de materiales, estructura de costos, intensidad de refuerzo |
| `06_Validation` | Verificación de integridad y errores | Estado de geometría, precios, alineación del refuerzo y conciliación del BOQ |

El flujo de datos previsto es:

```text
Measured Drawings / Takeoff Data
            │
            ▼
    02_Qty_Input
            │
      ┌─────┴─────┐
      ▼           ▼
03_Reinforcement  04_BOQ_Summary
      │           │
      └─────┬─────┘
            ▼
    05_Cost_Dashboard
            │
            ▼
      06_Validation

01_Parameters
      │
      └──────► shared assumptions and rates
````

La especificación de origen define `02_Qty_Input` como la hoja principal de entrada manual, con las columnas `A:K` destinadas a identificadores de elementos, referencias de planos, categorías, dimensiones, cantidades y parámetros de refuerzo. Los campos calculados ocupan `L:P`. 

El motor de refuerzo está basado en fórmulas y filtra únicamente los elementos que contienen parámetros de refuerzo. Su salida incluye la referencia del elemento, la categoría, el diámetro de barra, la longitud de corte, el número total de barras, los metros lineales totales, el peso unitario teórico, el peso neto y el peso con el desperdicio incluido. 

La capa de BOQ agrega seis partidas de estimación predefinidas que cubren movimiento de tierras, concreto de pilotes, concreto de cimentación estructural, encofrado, refuerzo de `>=16mm` y refuerzo inferior a `16mm`. 

### Tres trampas que atrapan incluso a estimadores experimentados

#### Trampa 1 — Medición correcta, total comercial equivocado

1. **Se tomó una decisión:**
   Se prepara un precio de licitación a partir de las cantidades medidas de la cimentación.

2. **El defecto oculto:**
   Los valores de cantidad y los precios comerciales se mantienen en tablas separadas copiadas manualmente.

3. **Cómo el defecto cambia la recomendación:**
   Una revisión de precios puede dejar parte de la estimación con un supuesto antiguo, haciendo que la oferta parezca más competitiva de lo que realmente es.

4. **Por qué el razonamiento es incorrecto:**
   El resultado comercial ya no es una función confiable de los supuestos actuales del proyecto.

5. **Enfoque corregido:**
   Mantener los precios principales de forma centralizada y calcular los importes del BOQ a partir de los totales de cantidad vigentes.

6. **Resultado corregido de la decisión:**
   Un cambio de precio se propaga a los valores de BOQ afectados, lo que permite al estimador revisar la posición resultante de la oferta desde una única cadena de cálculo.

<details>
<summary>Referencia de fórmulas</summary>

El importe del BOQ sigue la relación básica:

```excel
=Quantity*Unit_Rate
```

El total se concilia entonces como:

```excel
=SUM(F5:F10)
```

</details>

#### Trampa 2 — El tonelaje de acero parece plausible pero está desconectado

1. **Se tomó una decisión:**
   La compra de acero se basa en un total de refuerzo preparado por separado.

2. **El defecto oculto:**
   El resumen de acero no está vinculado directamente con las dimensiones por elemento, los tamaños de barra, las cantidades y las longitudes de corte calculadas.

3. **Cómo el defecto cambia la recomendación:**
   Un cambio en el número de elementos o en la geometría puede modificar el refuerzo requerido mientras la cifra de compra permanece sin cambios.

4. **Por qué el razonamiento es incorrecto:**
   Un total plausible no es suficiente si su origen no puede rastrearse hasta la entrada estructural vigente.

5. **Enfoque corregido:**
   Derivar los registros de refuerzo de la misma tabla de entrada de elementos y calcular los metros lineales totales antes de convertir a peso teórico.

6. **Resultado corregido de la decisión:**
   La estimación de refuerzo se mueve con los datos de elemento subyacentes y puede conciliarse con el conteo de elementos de origen.

<details>
<summary>Referencia de fórmulas</summary>

La implementación utiliza la relación teórica del refuerzo:

```excel
W = den * d^2
```

y convierte el valor resultante en kilogramos a toneladas después de aplicar el margen de desperdicio configurado:

```excel
=(tot_m*(den*dia*dia)*(1+waste))/1000
```

</details>

#### Trampa 3 — Un dato faltante se confunde con un resultado de bajo costo

1. **Se tomó una decisión:**
   La estimación parece inusualmente baja y se acepta como una cifra competitiva.

2. **El defecto oculto:**
   Un elemento estructural tiene una cantidad positiva pero una dimensión omitida o igual a cero.

3. **Cómo el defecto cambia la recomendación:**
   La dimensión faltante puede suprimir la cantidad calculada y, por lo tanto, subestimar el valor comercial.

4. **Por qué el razonamiento es incorrecto:**
   El modelo produce un resultado matemáticamente válido a partir de datos de construcción incompletos. La validez matemática no establece la validez de la estimación.

5. **Enfoque corregido:**
   Validar la geometría requerida y los datos de precios antes de aceptar la estimación.

6. **Resultado corregido de la decisión:**
   La estimación se revisa antes de convertirse en un compromiso de licitación o de compra.

<details>
<summary>Referencia de fórmulas</summary>

La capa de validación comprueba los elementos que no son de movimiento de tierras con un conteo positivo pero sin profundidad/altura:

```excel
=IF(
  COUNTIFS(
    '02_Qty_Input'!C:C,"<>Earthwork",
    '02_Qty_Input'!H:H,">0",
    '02_Qty_Input'!F:F,"<=0"
  )=0,
  "PASS",
  "FAIL"
)
```

</details>

### Escenario de ejemplo

Considere una estimación de cimentación que incluye pilotes, cabezales de pilotes, vigas de riostra, columnas cortas y excavación.

El flujo de trabajo comienza con entradas a nivel de elemento como las siguientes:

| Entrada                     |              Ejemplo |
| --------------------------- | ----------------: |
| Diámetro del pilote         |               0.60 m |
| Profundidad del pilote      |              18.00 m |
| Cantidad de pilotes         |                   24 |
| Longitud del cabezal        |               2.40 m |
| Ancho del cabezal           |               2.40 m |
| Profundidad del cabezal     |               0.80 m |
| Cantidad de cabezales       |                    6 |
| Diámetro refuerzo principal |                20 mm |
| Cantidad refuerzo principal | 16 barras / elemento |

La capa de entrada calcula la cantidad específica según la geometría de cada elemento. Los elementos circulares utilizan el cálculo basado en el diámetro, mientras que los elementos rectangulares usan largo × ancho × profundidad. El movimiento de tierras recibe el factor de tierras configurado de forma separada de las cantidades de elementos estructurales. 

El motor de refuerzo filtra después los elementos con información de refuerzo y deriva el número total de barras a partir de la cantidad del elemento y del número de refuerzos especificado. La longitud de corte se ajusta según la categoría del elemento, y los metros lineales totales se convierten en peso teórico usando la constante de diámetro y el margen de desperdicio configurados. 

Las cantidades resultantes alimentan el BOQ. Las cantidades de concreto, encofrado, movimiento de tierras y refuerzo se multiplican por sus precios configurados para producir los importes por partida y un costo total estimado. 

La capa de gestión expone después el resultado comercial mediante un conjunto más reducido de indicadores: costo total, volumen de concreto, tonelaje de refuerzo, cantidad de movimiento de tierras e intensidad de refuerzo por metro cúbico de concreto estructural. 

La decisión final no es simplemente **«¿Cuál es el total?»**

Sino:

**«¿La cantidad, el requerimiento de refuerzo, el supuesto de precio y el total comercial forman una estimación trazable e internamente coherente?»**

Esa distinción es importante cuando el libro de trabajo se utiliza para revisar licitaciones, preparar presupuestos o planificar compras.

### Referencia de fórmulas

<details>
<summary>Geometría de elementos</summary>

Para los elementos circulares, la implementación calcula el volumen a partir del diámetro y la altura/profundidad:

```excel
=LET(
    len, A5:INDEX(D:D, COUNTA(A:A)),
    wid, E5:INDEX(E:E, COUNTA(A:A)),
    hgt, F5:INDEX(F:F, COUNTA(A:A)),
    dia, G5:INDEX(G:G, COUNTA(A:A)),
    IF(dia>0, 3.1415926*(dia/2)^2*hgt, len*wid*hgt)
)
```

Para los elementos rectangulares, el cálculo recurre a:

```text
Length × Width × Height
```

</details>

<details>
<summary>Cantidad de movimiento de tierras</summary>

El movimiento de tierras recibe el factor configurado desde `01_Parameters`:

```excel
=LET(
    u_vol, L5#,
    qty, H5:INDEX(H:H, COUNTA(A:A)),
    cat, C5:INDEX(C:C, COUNTA(A:A)),
    IF(
        cat="Earthwork",
        u_vol*qty*'01_Parameters'!$B$13,
        u_vol*qty
    )
)
```

Por lo tanto, la implementación mantiene el factor de movimiento de tierras fuera del cálculo geométrico base y lo aplica según la categoría del elemento. 

</details>

<details>
<summary>Cálculo de encofrado</summary>

La cantidad de encofrado se determina a partir de la categoría del elemento:

```excel
=LET(
    cat, C5:INDEX(C:C, COUNTA(A:A)),
    len, D5:INDEX(D:D, COUNTA(A:A)),
    wid, E5:INDEX(E:E, COUNTA(A:A)),
    hgt, F5:INDEX(F:F, COUNTA(A:A)),
    qty, H5:INDEX(H:H, COUNTA(A:A)),
    SWITCH(
        cat,
        "Pile", 0,
        "Earthwork", 0,
        "Pile Cap", 2*(len+wid)*hgt*qty,
        "Beam", (2*hgt+wid)*len*qty,
        "Column", 2*(len+wid)*hgt*qty,
        0
    )
)
```

Esto refleja el tratamiento declarado de la implementación para las superficies de contacto del encofrado según la categoría del elemento. 

</details>

<details>
<summary>Peso del refuerzo</summary>

El motor de refuerzo calcula el peso total usando la constante de peso teórico y el margen de desperdicio configurados:

```excel
=LET(
    dia, C5#,
    tot_m, F5#,
    den, '01_Parameters'!$B$11,
    waste, '01_Parameters'!$B$12,
    (tot_m*(den*dia*dia)*(1+waste))/1000
)
```

La tabla de parámetros define la constante de peso teórico como `0.006165` y el margen de desperdicio de refuerzo predeterminado como `3.0%`. 

</details>

<details>
<summary>Agregación del BOQ</summary>

El BOQ utiliza una agregación por categoría como la siguiente:

```excel
=SUMIFS(
    '02_Qty_Input'!M:M,
    '02_Qty_Input'!C:C,
    "Earthwork"
)
```

y una agregación por diámetro de refuerzo como la siguiente:

```excel
=SUMIFS(
    '03_Reinforcement_Engine'!I:I,
    '03_Reinforcement_Engine'!C:C,
    ">=16"
)
```

El total final del BOQ es:

```excel
=SUM(F5:F10)
```

</details>

<details>
<summary>Indicadores del panel de costos</summary>

El indicador de intensidad de refuerzo se calcula como:

```excel
=LET(
    conc_vol, '04_BOQ_Summary'!$D$7,
    rebar_ton, '04_BOQ_Summary'!$D$9+'04_BOQ_Summary'!$D$10,
    IF(conc_vol>0,(rebar_ton*1000)/conc_vol,0)
)
```

Esto expresa el consumo de refuerzo en kilogramos por metro cúbico de concreto estructural. 

</details>

### Reglas de validación

| Campo / comprobación   | Regla                                                                                          | Comportamiento ante error             |
| ----------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------- |
| Integridad geométrica   | Los elementos que no son de movimiento de tierras con un conteo positivo deben tener una altura/profundidad positiva. | `FAIL`                                |
| Validez del precio unitario | Los precios configurados de concreto, excavación, encofrado y refuerzo deben ser mayores que cero. | `WARNING`                             |
| Alineación del refuerzo | Las filas de refuerzo generadas deben coincidir con los elementos de entrada que contienen datos de refuerzo. | `MISMATCH`                            |
| Conciliación del BOQ    | El total del BOQ debe ser igual a la suma de los valores de cantidad × precio unitario de las partidas, tras el redondeo. | `ERR`                                 |
| Integridad de matrices dinámicas | Los rangos de desbordamiento de fórmulas deben permanecer libres de valores introducidos manualmente o de celdas combinadas. | `#SPILL!` requiere limpiar el área de entrada |

La matriz de validación de origen define cuatro comprobaciones principales que cubren geometría, precios, alineación de filas de refuerzo y conciliación de importes del BOQ. 

</details>

---

## Otras herramientas de esta serie

* **[DIN-743-Shaft-Calculations](https://github.com/HyVoid/DIN-743-Shaft-Calculations)** — ¿El diseño del eje cumple la lógica de cálculo correspondiente? — Aplique las normas de cálculo de ejes DIN 743 a las decisiones de diseño de ingeniería.
* **[construction-estimating](https://github.com/HyVoid/construction-estimating)** — ¿Cuánto costará este alcance de obra según los supuestos actuales? — Estandarice la estimación de licitaciones de construcción y transforme las estimaciones completadas en bibliotecas de costos reutilizables.
* **[aia-construction-cost-tracker-excel](https://github.com/HyVoid/aia-construction-cost-tracker-excel)** — ¿Cómo se comparan las estimaciones y los costos registrados a lo largo de la ejecución? — Compare las estimaciones de construcción con los costos reales durante toda la ejecución del proyecto usando formatos estándar AIA.
* **[construction-project-management-excel](https://github.com/HyVoid/construction-project-management-excel)** — ¿Es exacta la posición financiera del proyecto tras incorporar los cambios aprobados, los costos reales y el avance de la facturación? — Integre presupuestos, órdenes de cambio, facturación por avance y flujo de caja en un único marco de control de proyectos de construcción.
* **[industrial-energy-tco-calculator](https://github.com/HyVoid/industrial-energy-tco-calculator)** — ¿Qué opción energética ofrece el menor costo total de propiedad para este proyecto concreto en sus condiciones reales de operación? — Compare fuentes de energía industrial sobre una base de energía útil real, normalizando costos de combustible, eficiencia de los equipos, inversión en infraestructura y costos de propiedad durante el ciclo de vida.
* **[residential-boq-template](https://github.com/HyVoid/residential-boq-template)** — ¿Cuánto costará este proyecto residencial y qué divisiones ya están por encima del presupuesto? — Estime los costos de construcción residencial a partir de mediciones y precios del BOQ, controlando al mismo tiempo los presupuestos aprobados frente al gasto real.
* **[tunnel-cost-estimator-boq-excel](https://github.com/HyVoid/tunnel-cost-estimator-boq-excel)** — ¿Cuánto costará este proyecto de túnel por perforación y voladura según el ciclo de construcción supuesto? — Estime la excavación de túnel por perforación y voladura, la perforación, la voladura, el sostenimiento, el equipo y la mano de obra necesarios, integrando todo en un costo de proyecto y un BOQ completos.

## Licencia

Este proyecto se publica bajo la **Licencia Apache 2.0**.

Consulte el archivo [`LICENSE`](LICENSE) para los términos completos de la licencia.


