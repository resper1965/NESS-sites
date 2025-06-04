import { useQuery } from '@tanstack/react-query';
import { useI18n } from '@/lib/i18n';

import SiteLayout from '@/site/layout/SiteLayout';
import { Content } from '@shared/schema';

export default function PrivacyPage() {
  const { t, language } = useI18n();
  
  // Fetch privacy content
  const { data: content, isLoading } = useQuery<Content>({
    queryKey: [`/api/content/privacy?lang=${language}`],
  });

  const defaultContent = {
    title: 'Política de Segurança e Privacidade',
    content: `
      <div class="prose prose-lg mx-auto">
        <h2>Introdução</h2>
        <p>Na ness., proteger as informações dos nossos clientes, parceiros e colaboradores é uma prioridade fundamental. Esta Política de Segurança e Privacidade estabelece como coletamos, usamos, protegemos e compartilhamos dados pessoais e informações confidenciais.</p>
        
        <h2>Compromisso com a Proteção de Dados</h2>
        <p>Estamos comprometidos em cumprir plenamente as leis e regulamentos de proteção de dados aplicáveis, em especial a Lei Geral de Proteção de Dados (LGPD) no Brasil, o Regulamento Geral de Proteção de Dados (GDPR) na União Europeia e outras regulamentações semelhantes.</p>
        
        <h2>Definições</h2>
        <ul>
          <li><strong>Dados Pessoais:</strong> Qualquer informação relacionada a uma pessoa natural identificada ou identificável.</li>
          <li><strong>Dados Sensíveis:</strong> Dados pessoais sobre origem racial ou étnica, convicção religiosa, opinião política, filiação a sindicato, organização de caráter religioso, filosófico ou político, dados referentes à saúde ou à vida sexual, dado genético ou biométrico.</li>
          <li><strong>Tratamento de Dados:</strong> Toda operação realizada com dados pessoais, como coleta, produção, recepção, classificação, utilização, acesso, reprodução, transmissão, distribuição, processamento, arquivamento, armazenamento, eliminação, avaliação ou controle da informação, modificação, comunicação, transferência, difusão ou extração.</li>
        </ul>
        
        <h2>Coleta e Uso de Dados Pessoais</h2>
        <p>Coletamos dados pessoais para finalidades específicas, legítimas e informadas ao titular. As principais finalidades incluem:</p>
        <ul>
          <li>Fornecer nossos produtos e serviços.</li>
          <li>Melhorar nossos produtos e serviços.</li>
          <li>Comunicar-nos com clientes, fornecedores e parceiros.</li>
          <li>Cumprir obrigações legais e contratuais.</li>
          <li>Proteger nossos direitos e interesses legítimos.</li>
        </ul>
        
        <h2>Tipos de Dados Coletados</h2>
        <p>Dependendo da natureza da relação, podemos coletar:</p>
        <ul>
          <li><strong>Dados de Identificação:</strong> Nome, endereço, e-mail, telefone, documentos de identidade.</li>
          <li><strong>Dados Profissionais:</strong> Cargo, empresa, histórico profissional.</li>
          <li><strong>Dados de Acesso:</strong> Endereço IP, logs de acesso, informações de dispositivos.</li>
          <li><strong>Dados de Transações:</strong> Histórico de compras, serviços contratados.</li>
        </ul>
        
        <h2>Base Legal para o Tratamento de Dados</h2>
        <p>Realizamos o tratamento de dados pessoais sempre com base em fundamentos legais, tais como:</p>
        <ul>
          <li>Consentimento do titular.</li>
          <li>Execução de contrato ou procedimentos preliminares.</li>
          <li>Cumprimento de obrigação legal ou regulatória.</li>
          <li>Exercício regular de direitos em processo judicial, administrativo ou arbitral.</li>
          <li>Legítimo interesse do controlador ou de terceiros.</li>
        </ul>
        
        <h2>Compartilhamento de Dados</h2>
        <p>Podemos compartilhar dados pessoais com:</p>
        <ul>
          <li>Prestadores de serviços necessários à nossa operação.</li>
          <li>Parceiros de negócios, quando necessário para a execução de serviços.</li>
          <li>Autoridades governamentais, quando exigido por lei.</li>
        </ul>
        <p>Em todos os casos, exigimos que os destinatários dos dados adotem medidas de segurança adequadas e cumpram as leis de proteção de dados.</p>
        
        <h2>Transferência Internacional de Dados</h2>
        <p>Quando necessário transferir dados pessoais para outros países, garantimos que sejam adotadas medidas de proteção adequadas, tais como:</p>
        <ul>
          <li>Transferência para países com nível adequado de proteção de dados.</li>
          <li>Adoção de cláusulas contratuais padrão.</li>
          <li>Obtenção de consentimento específico do titular.</li>
        </ul>
        
        <h2>Segurança da Informação</h2>
        <p>Implementamos medidas técnicas e organizacionais para proteger os dados pessoais, incluindo:</p>
        <ul>
          <li>Criptografia de dados sensíveis e em trânsito.</li>
          <li>Controles de acesso físico e lógico.</li>
          <li>Políticas de backup e recuperação de dados.</li>
          <li>Monitoramento contínuo de segurança.</li>
          <li>Avaliações regulares de vulnerabilidade e testes de penetração.</li>
          <li>Treinamento e conscientização dos colaboradores.</li>
        </ul>
        
        <h2>Direitos dos Titulares de Dados</h2>
        <p>Garantimos aos titulares de dados pessoais o exercício dos seguintes direitos:</p>
        <ul>
          <li>Confirmação da existência de tratamento.</li>
          <li>Acesso aos dados.</li>
          <li>Correção de dados incompletos, inexatos ou desatualizados.</li>
          <li>Anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a lei.</li>
          <li>Portabilidade dos dados.</li>
          <li>Eliminação dos dados tratados com consentimento.</li>
          <li>Informação sobre compartilhamento de dados.</li>
          <li>Revogação do consentimento.</li>
        </ul>
        
        <h2>Retenção de Dados</h2>
        <p>Mantemos os dados pessoais apenas pelo tempo necessário para cumprir as finalidades para as quais foram coletados, observando também:</p>
        <ul>
          <li>Requisitos legais e regulatórios de retenção.</li>
          <li>Prazos prescricionais aplicáveis.</li>
          <li>Legítimo interesse da empresa, quando aplicável.</li>
        </ul>
        
        <h2>Cookies e Tecnologias Similares</h2>
        <p>Utilizamos cookies e tecnologias similares para melhorar a experiência do usuário, analisar o tráfego e personalizar conteúdo. Os usuários podem gerenciar suas preferências de cookies através das configurações do navegador.</p>
        
        <h2>Resposta a Incidentes de Segurança</h2>
        <p>Temos procedimentos estabelecidos para responder a incidentes de segurança envolvendo dados pessoais, incluindo:</p>
        <ul>
          <li>Protocolos de notificação interna.</li>
          <li>Avaliação e contenção do incidente.</li>
          <li>Notificação à autoridade de proteção de dados e aos titulares, quando necessário.</li>
          <li>Implementação de medidas corretivas.</li>
        </ul>
        
        <h2>Governança de Privacidade</h2>
        <p>Nossa estrutura de governança de privacidade inclui:</p>
        <ul>
          <li>Encarregado de Proteção de Dados (DPO).</li>
          <li>Comitê de Privacidade e Segurança da Informação.</li>
          <li>Programa de treinamento e conscientização.</li>
          <li>Avaliação de impacto de proteção de dados para novos produtos e serviços.</li>
          <li>Auditorias regulares de conformidade.</li>
        </ul>
        
        <h2>Contato e Dúvidas</h2>
        <p>Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato com nosso Encarregado de Proteção de Dados através do e-mail privacidade@corptech.com ou pelo telefone +55 (11) 3456-7890.</p>
        
        <h2>Atualizações desta Política</h2>
        <p>Esta Política de Segurança e Privacidade pode ser atualizada periodicamente. Recomendamos que a consulte regularmente. A data da última atualização está indicada no final do documento.</p>
        
        <p>Última atualização: 15 de junho de 2023.</p>
      </div>
    `
  };

  return (
    <SiteLayout
      title={`${content?.title || defaultContent.title} - ness.`}
      description="Conheça nossa Política de Segurança e Privacidade e como tratamos seus dados pessoais com o máximo de segurança e transparência."
      canonicalUrl="/privacy"
    >
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-primary text-white">
          <div className="container mx-auto px-4 pt-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{content?.title || defaultContent.title}</h1>
              <div className="w-20 h-1 bg-accent mx-auto"></div>
            </div>
          </div>
        </section>
        
        {/* Content Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6 mb-4"></div>
              </div>
            ) : (
              <div 
                className="prose prose-lg mx-auto"
                dangerouslySetInnerHTML={{ 
                  __html: content?.content || defaultContent.content 
                }}
              />
            )}
          </div>
        </section>
      </main>
      
    </SiteLayout>
  );
}
