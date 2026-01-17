// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient'; // <--- 1. IMPORTAMOS EL CLIENTE
import { 
  Card, Grid, Title, Text, Tab, TabList, TabGroup, TabPanel, TabPanels, Metric, 
  AreaChart, DonutChart, BarList, Flex, Badge, Icon, Table, TableHead, TableRow, 
  TableHeaderCell, TableBody, TableCell
} from "@tremor/react";
import { 
  CurrencyDollarIcon, UserGroupIcon, BriefcaseIcon, ChartBarIcon, UserPlusIcon 
} from "@heroicons/react/24/solid";

// --- DATOS MOCK (Solo para Ventas, ya que aún no tenemos tabla de ventas) ---
const salesData = [
  { date: "Jan", Revenue: 2890, Quotes: 12 },
  { date: "Feb", Revenue: 3500, Quotes: 15 },
  { date: "Mar", Revenue: 2200, Quotes: 10 },
  { date: "Apr", Revenue: 4100, Quotes: 22 },
  { date: "May", Revenue: 5400, Quotes: 28 },
  { date: "Jun", Revenue: 7200, Quotes: 35 },
];
const relationshipsData = [
  { name: "Recurring", value: 65 },
  { name: "One-Time", value: 35 },
];
const serviceMix = [
  { name: "Deep Clean", value: 45 },
  { name: "Standard Clean", value: 30 },
  { name: "Move In/Out", value: 25 },
];

const Dashboard = () => {
  
  // --- ESTADOS PARA DATOS REALES (Talento) ---
  const [metrics, setMetrics] = useState({
    total: 0,
    qualified: 0,
    waitlist: 0,
    hired: 0 // Este campo podríamos manejarlo manual o con otra lógica futura
  });
  const [recentCandidates, setRecentCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- EFECTO: CARGAR DATOS DE SUPABASE AL INICIAR ---
  useEffect(() => {
    fetchRecruitmentData();
  }, []);

  async function fetchRecruitmentData() {
    try {
      setLoading(true);
      
      // 1. Obtener Total de Aplicaciones
      const { count: totalCount } = await supabase
        .from('candidates')
        .select('*', { count: 'exact', head: true });

      // 2. Obtener Cualificados (Status = 'qualified')
      const { count: qualifiedCount } = await supabase
        .from('candidates')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'qualified');

      // 3. Obtener Waitlist (Status = 'waitlist')
      const { count: waitlistCount } = await supabase
        .from('candidates')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'waitlist');

      // 4. Obtener los últimos 5 candidatos para la tabla
      const { data: candidatesData } = await supabase
        .from('candidates')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      // Actualizar estado
      setMetrics({
        total: totalCount || 0,
        qualified: qualifiedCount || 0,
        waitlist: waitlistCount || 0,
        hired: 0 // Mock por ahora
      });
      setRecentCandidates(candidatesData || []);

    } catch (error) {
      console.error("Error cargando datos:", error);
    } finally {
      setLoading(false);
    }
  }

  // Calculamos porcentaje de rechazo real
  const disqualificationRate = metrics.total > 0 
    ? Math.round(((metrics.total - metrics.qualified) / metrics.total) * 100) 
    : 0;

  // Datos para el gráfico Funnel (Mezcla real y estimado)
  const realFunnel = [
    { name: "Applications", value: metrics.total },
    { name: "Qualified", value: metrics.qualified },
    { name: "Interviews (Est)", value: Math.round(metrics.qualified * 0.8) }, // Estimado 80% agenda
    { name: "Hired", value: metrics.hired },
  ];

  return (
    <main className="bg-slate-50 min-h-screen p-6 sm:p-10">
      <div className="mb-8">
        <Title className="text-3xl font-bold text-navy">Top Cleaning Command Center</Title>
        <Text>Operational overview: Revenue, Relationships & Talent.</Text>
      </div>

      <TabGroup className="mt-6">
        <TabList>
          <Tab icon={CurrencyDollarIcon}>Business & Sales</Tab>
          <Tab icon={UserGroupIcon}>Talent & Recruiting</Tab>
        </TabList>

        <TabPanels>
          
          {/* PANEL 1: VENTAS (MOCK DATA POR AHORA) */}
          <TabPanel>
            <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-6 mt-6">
              <Card decoration="top" decorationColor="yellow">
                <Flex justifyContent="start" className="space-x-4">
                  <Icon icon={CurrencyDollarIcon} variant="light" size="xl" color="yellow" />
                  <div><Text>Total Revenue (YTD)</Text><Metric>$25,290</Metric></div>
                </Flex>
              </Card>
              <Card decoration="top" decorationColor="blue">
                <Flex justifyContent="start" className="space-x-4">
                  <Icon icon={ChartBarIcon} variant="light" size="xl" color="blue" />
                  <div>
                    <Text>TVR (Total Value Ratio)</Text><Metric>4.2</Metric>
                    <Text className="text-xs text-gray-500 mt-1">Lifetime Value / CAC</Text>
                  </div>
                </Flex>
              </Card>
              <Card decoration="top" decorationColor="green">
                <Flex justifyContent="start" className="space-x-4">
                    <Icon icon={UserGroupIcon} variant="light" size="xl" color="green" />
                    <div><Text>Active Clients</Text><Metric>124</Metric></div>
                </Flex>
              </Card>
              <Card decoration="top" decorationColor="purple">
                <Flex justifyContent="start" className="space-x-4">
                    <Icon icon={BriefcaseIcon} variant="light" size="xl" color="purple" />
                    <div><Text>Avg. Ticket Size</Text><Metric>$185</Metric></div>
                </Flex>
              </Card>
            </Grid>
            <div className="mt-6">
              <Grid numItems={1} numItemsLg={3} className="gap-6">
                <Card className="col-span-1 lg:col-span-2">
                  <Title>Revenue & Quote Volume</Title>
                  <AreaChart className="h-72 mt-4" data={salesData} index="date" categories={["Revenue", "Quotes"]} colors={["blue", "yellow"]} valueFormatter={(number) => `$${Intl.NumberFormat("us").format(number).toString()}`} yAxisWidth={60} />
                </Card>
                <Card className="col-span-1">
                  <Title>Relationships Mapping</Title>
                  <Text>Recurring vs One-Time</Text>
                  <DonutChart className="mt-6" data={relationshipsData} category="value" index="name" valueFormatter={(number) => `${number}%`} colors={["blue", "cyan"]} />
                  <div className="mt-6 border-t pt-4">
                    <Title>Service Mix</Title>
                    <BarList data={serviceMix} className="mt-2" color="indigo" />
                  </div>
                </Card>
              </Grid>
            </div>
          </TabPanel>

          {/* PANEL 2: TALENTO (DATOS REALES DE SUPABASE) */}
          <TabPanel>
            <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6 mt-6">
              {/* KPI 1: Aplicaciones Totales */}
              <Card>
                <Flex alignItems="start">
                   <div>
                      <Title>Applications</Title>
                      <Metric>{metrics.total}</Metric>
                   </div>
                   <Icon icon={UserPlusIcon} size="lg" color="blue" />
                </Flex>
                <div className="mt-4">
                  <Text className="truncate">Auto-Filter Rejection Rate</Text>
                  <Text color="red">{disqualificationRate}% Disqualified</Text>
                </div>
              </Card>
              
              {/* KPI 2: Entrevistas (Estimado basado en cualificados) */}
              <Card>
                <Title>Qualified Candidates</Title>
                <Metric>{metrics.qualified}</Metric>
                <Text className="mt-4 text-green-600">Invited to Interview</Text>
              </Card>

              {/* KPI 3: Activos (Hardcoded por ahora) */}
              <Card>
                <Title>Active Cleaners</Title>
                <Metric>8</Metric>
                <Text className="mt-4">Currently deployed</Text>
              </Card>
            </Grid>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* FUNNEL REAL */}
              <Card>
                <Title>Recruitment Funnel</Title>
                <Text>Real-time data from Applications</Text>
                <BarList data={realFunnel} className="mt-4" color="blue" />
              </Card>

              {/* TABLA DE CANDIDATOS RECIENTES (REAL) */}
              <Card>
                <Title>Recent Candidates</Title>
                <Text className="mb-4">Live feed from Supabase</Text>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>Name</TableHeaderCell>
                      <TableHeaderCell>Status</TableHeaderCell>
                      <TableHeaderCell>Experience</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentCandidates.length === 0 ? (
                        <TableRow><TableCell>No candidates yet...</TableCell></TableRow>
                    ) : (
                        recentCandidates.map((candidate) => (
                        <TableRow key={candidate.id}>
                            <TableCell>{candidate.full_name}</TableCell>
                            <TableCell>
                            <Badge color={candidate.status === 'qualified' ? 'green' : 'yellow'} size="xs">
                                {candidate.status}
                            </Badge>
                            </TableCell>
                            <TableCell>{candidate.experience}</TableCell>
                        </TableRow>
                        ))
                    )}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </TabPanel>

        </TabPanels>
      </TabGroup>
    </main>
  );
};

export default Dashboard;