# Guía de adopción empresarial de ADLC

Esta guía lleva a la práctica el [manifiesto](../manifesto.md), el [ciclo de vida](../lifecycle.md) y las [skills compartidas](../shared-skills.md). Es un modelo de adopción ilustrativo, no una certificación, garantía de conformidad ni conjunto universal de umbrales. Adaptar los controles al impacto empresarial y al modelo de riesgo de la organización. La [versión inglesa](enterprise-adoption.md) es la fuente de referencia.

La gobernanza del conocimiento abarca documentos, prompts, skills compartidas, políticas, memoria y contexto runtime, independientemente de cómo se proporcionen. La generación aumentada por recuperación (RAG) es una técnica opcional, no un requisito previo de ADLC. Cuando se utilice, gobernar la calidad del retrieval, la actualización de fuentes, los permisos de acceso y las citas, junto con pruebas de regresión del comportamiento. El context engineering compone el contexto operativo del agente; no sustituye estos controles de gobernanza.

## 1. Aprobar el siguiente incremento

**Ninguna implementación comienza sin haber superado el quality gate de requisitos.**

Aprobar el alcance del siguiente incremento, en lugar de intentar fijar todos los requisitos futuros. Registrar responsables de negocio, ingeniería y riesgo; resultado esperado; criterios de aceptación medibles; datos autorizados; incertidumbres conocidas; condiciones que exigen una nueva aprobación.

Comparar automatización determinista, workflow LLM, agente único y orquestación multiagente. Utilizar la mínima autonomía y complejidad necesarias para lograr el resultado validado. Más agentes no demuestran mayor madurez.

Para un experimento, el incremento aprobado debe especificar hipótesis, sandbox, datos permitidos, presupuesto y criterios de salida. La aprobación experimental no concede acceso a producción. Un agente de quality gate puede preparar evidencias, pero no sustituir la decisión humana responsable.

## 2. Definir un contrato de autonomía

Versionar el contrato junto con la implementación y las evidencias de release:

| Control | Decisión requerida |
| --- | --- |
| Responsabilidad | Responsable de negocio, operador técnico, revisor del riesgo y vía de escalado identificados |
| Autoridad | Acciones permitidas y prohibidas, roles delegados y límites de aprobación humana |
| Datos | Fuentes permitidas, clasificación, ámbito de tenant y usuario, destinos de salida |
| Límites | Presupuestos de coste, tiempo, llamadas a herramientas y reintentos; impacto máximo de transacción o negocio |
| Aplicación de controles | Credenciales de mínimo privilegio y comprobaciones de políticas en el límite de la herramienta o servicio, no solo en prompts |
| Aprobación | Aprobador autorizado, acción exacta y versión de entradas aprobadas, caducidad y nueva aprobación tras cambios sustanciales |
| Parada y recuperación | Condiciones de parada, revocación, operación degradada, responsables de reconciliación y compensación |
| Delegación | Los agentes posteriores heredan o reducen la autoridad; no pueden ampliarla silenciosamente |

Probar las acciones denegadas además de las permitidas. Los documentos recuperados, respuestas de herramientas y otros contenidos no fiables no pueden prevalecer sobre el contrato. Registrar decisiones y resultados sin incluir secretos o datos personales innecesarios.

### Hacer efectiva la supervisión humana

Supervisión competente, no aprobación de trámite. Asignar revisores formados en el dominio, las limitaciones de los agentes y los riesgos de decisión. Antes de asignar tareas de aprobación, realizar ejercicios proporcionales al riesgo con recomendaciones incorrectas, evidencias ausentes e incidentes, para comprobar que reconocen la incertidumbre y pueden intervenir. Actualizar la formación tras cambios sustanciales o incidentes relevantes.

- Proporcionar fuentes, evidencias, limitaciones conocidas, incertidumbres y consecuencias de la acción propuesta, no solo la recomendación del agente.
- Dar tiempo suficiente y una carga de trabajo manejable. Si no es posible una revisión sustantiva, pausar la acción o dirigirla a una alternativa autorizada; no aprobarla implícitamente.
- Conceder autoridad efectiva para cuestionar, rechazar, pausar, solicitar revisión y escalar, sin depender de la cooperación del agente.
- Registrar revisor, evidencias examinadas, decisión y justificación proporcional al riesgo. Muestrear periódicamente la calidad de las decisiones e investigar señales de aprobación habitual; contar aprobaciones no demuestra supervisión.

Una aprobación formal sin verificación sustantiva no es un control de gobernanza.

## 3. Gobernar conocimiento, contexto y memoria

Mantener documentación humana y contexto del agente conectados pero separados. La documentación humana facilita lectura, revisión y auditoría. Los endpoints para agentes exponen contexto aprobado y pertinente para la tarea, con URL estables, acceso autenticado cuando proceda, responsables de fuentes, versiones, estado de aprobación y reglas de retrieval.

Las instantáneas versionadas de las fuentes y la configuración del retrieval forman parte de las evidencias de release. La memoria mutable requiere un historial de eventos gobernado: origen, escritor autorizado, ámbito, marcas temporales, retención, corrección y eliminación. Aislar usuarios y tenants; definir cómo resolver hechos contradictorios u obsoletos. No convertir automáticamente una inferencia del agente en conocimiento autorizado.

La compresión del contexto debe ahorrar tokens sin eliminar permisos, restricciones, procedencia de fuentes ni evidencias necesarias para decidir correctamente. Evaluar el contexto comprimido frente a los mismos requisitos de comportamiento. Una URL, conexión MCP o archivo llms.txt no establece por sí solo confianza ni autorización.

## 4. Evaluar el comportamiento antes de la promoción

Crear un dataset representativo y versionado, vinculado a requisitos y casos de riesgo. Incluir resultados normales, solicitudes ambiguas, acciones no autorizadas, injection, conocimiento manipulado u obsoleto, fallos de retrieval, acceso entre tenants, timeouts de herramientas, solicitudes duplicadas, escalado y comportamiento de parada.

Repetir ensayos con estado aislado. Registrar dataset, configuración del modelo, prompts, herramientas, versiones de conocimiento y evaluadores, tamaño de muestra, variabilidad y lagunas de cobertura. Inspeccionar cambios reales de estado y cumplimiento de políticas, no solo una respuesta final plausible o una secuencia exacta de llamadas. Calibrar evaluadores basados en modelos con juicios de expertos del dominio y revisar desacuerdos.

Acordar umbrales de aceptación basados en riesgo antes de probar. El fallo de cualquier control obligatorio bloquea la promoción. Un conjunto finito de pruebas no demuestra la ausencia de fallos futuros. Repetir las pruebas de regresión pertinentes cuando cambie una entrada capaz de alterar el comportamiento, aunque no cambie el código.

## 5. Liberar, operar y recuperar

Las evidencias de release deben vincular requisito, fuente de conocimiento, comportamiento del agente, resultado de prueba, aprobación e identidad de release. Incluir todas las entradas que afectan al comportamiento, contrato de autonomía, limitaciones conocidas, plan de despliegue y ejercicios de recuperación.

Distinguir tres operaciones:

- **Rollback de configuración:** restaurar, cuando exista, una configuración anterior de código, prompt, conocimiento, herramienta o modelo.
- **Restauración de estado:** restaurar o reconciliar el estado interno sin repetir efectos externos.
- **Compensación:** aplicar una acción de negocio autorizada por separado para tratar un efecto externo que no puede simplemente deshacerse.

Usar despliegue gradual y controles preventivos para acciones irreversibles. Definir qué ocurre si falta un aprobador, una herramienta devuelve un resultado incierto o se agota el presupuesto. Los reintentos limitados no deben duplicar pagos ni otros efectos.

Monitorizar éxito, violaciones de políticas, deriva, calidad del retrieval, coste por tarea exitosa, latencia, intervención humana, retrabajo, escalado y valor empresarial frente a la referencia. Incluir intentos fallidos y gestión humana en el coste. Las evidencias pueden justificar un workflow más simple, menos autonomía o retirada. La retirada incluye revocar credenciales, desactivar endpoints y tareas programadas, y conservar o eliminar memoria y evidencias según la política aprobada.

## Ejemplo completo: asistencia con reembolsos

Los números siguientes son umbrales ilustrativos para un piloto, no requisitos ADLC.

| Etapa | Control y evidencias |
| --- | --- |
| Requisitos | Aprobar un incremento que redacta recomendaciones de reembolso a partir de un pedido y una política aprobada. Comparar con una referencia basada solo en reglas. Buscar un 20% menos de tiempo mediano de gestión sin reducir la calidad de las decisiones evaluada independientemente. |
| Idoneidad | Usar un workflow LLM acotado para interpretar solicitudes y explicar recomendaciones. Elegibilidad y límites monetarios siguen siendo deterministas. No se necesita un sistema multiagente para este incremento. |
| Autoridad | Leer solo el pedido del cliente autenticado y la política aprobada. El workflow no puede cambiar política, destino del pago ni identidad del cliente. Una persona aprueba cada reembolso contra un ID inmutable de propuesta y el importe exacto. |
| Implementación | El servicio de pagos verifica autorización, versión de propuesta, caducidad de aprobación y clave de idempotencia antes de ejecutar. Las entradas modificadas invalidan la aprobación. Una aprobación ausente o caducada dirige a una cola humana sin ejecución. |
| Conocimiento | Fijar la versión de la política de reembolso aprobada y la configuración del retrieval. Definir la retención del contexto temporal del caso; prohibir memoria compartida entre clientes y actualizaciones de políticas escritas por agentes. |
| Evaluación | Usar 200 casos revisados, cada uno ejecutado cinco veces con estado aislado, incluyendo injection, aprobación caducada, acceso entre clientes, solicitudes duplicadas y timeouts de pagos. Exigir cero pagos no autorizados o duplicados observados, al menos un 95% de acuerdo con los resultados de elegibilidad adjudicados y escalado para cada caso incierto definido. Informar de límites de muestra y desacuerdos. |
| Aprobación y release | Responsables de negocio y riesgo aprueban umbrales, excepciones y riesgo residual. Los revisores realizan ejercicios con importes incorrectos, políticas obsoletas y pagos de resultado incierto. Examinan pedido, fuente de política, importe y consecuencias, con tiempo y autoridad para rechazar o pausar. Registrar evidencias revisadas y justificación. Vincular RF-01 a versión de política, comportamiento de propuesta, informe de evaluación, controles del servicio e ID de release. Empezar con un pequeño grupo supervisado. |
| Operación | Seguir tiempo de gestión, calidad, escalado, retrabajo y coste total por caso resuelto, incluidos reintentos y esfuerzo humano. Detener la ejecución automática ante una acción no autorizada, un control de aprobación fallido o una señal de pago duplicado. |
| Incidente y recuperación | Tras un timeout, consultar el servicio de pagos con la clave de idempotencia antes de reintentar. Pausar la ejecución y revocar acceso si procede. Revertir política o configuración defectuosa; reconciliar el caso con el registro de pagos. Un reembolso completado no se deshace con rollback de configuración: un responsable de negocio autorizado decide las compensaciones o remedios al cliente permitidos. |
| Mejora o retirada | Añadir el incidente a los casos de regresión y volver a aprobar el incremento modificado. Si no se alcanza el objetivo de calidad o valor, volver a operar solo con recomendaciones o retirar el workflow y gestionar accesos y memoria según políticas. |

## Registro de evidencias reutilizable

Mantener un registro vinculado por incremento aprobado y release:

- ID de requisito, responsable, resultado, decisión de idoneidad, referencia, riesgos y aprobación.
- Contrato de autonomía versionado, permisos, fuentes de conocimiento, política de memoria y controles runtime.
- Inventario de cambios de código, prompts, skills, conocimiento, herramientas, configuración del modelo y orquestación.
- Versiones del dataset y evaluadores, resultados de ensayos, umbrales, lagunas de cobertura y revisión humana.
- Autorización de release, alcance del despliegue, criterios de parada y resultados de ejercicios de recuperación.
- Resultados operativos, incidentes, decisiones correctivas y siguiente incremento aprobado o registro de retirada.

## Referencias especializadas

Estas fuentes fundamentan las prácticas anteriores; la guía es una adaptación ADLC, no una declaración de respaldo o certificación.

- [Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) explica la simplicidad y las decisiones entre workflows y agentes.
- [Anthropic: Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) aborda evaluaciones repetidas, resultados y calibración de evaluadores.
- [Anthropic: Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) cubre gestión del contexto y memoria.
- [OWASP: Top 10 for Agentic Applications](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/) aporta una perspectiva de controles agénticos basada en amenazas.
- [Microsoft: AI agent orchestration patterns](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns) describe decisiones de orquestación y problemas de fiabilidad.
- [NIST: AI Risk Management Framework core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) enmarca gobernanza y gestión del riesgo durante el ciclo de vida.
