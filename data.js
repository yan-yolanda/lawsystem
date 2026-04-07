(function () {
  const DIRECTION_SEEDS = [
    { direction: "数字法治", type: "重点项目", keywords: ["数据要素", "算法治理", "平台责任", "个人信息保护", "数字证据"], titles: ["生成式人工智能服务中的平台责任边界研究", "数据要素市场配置中的公共法治理机制研究", "算法推荐场景下个人信息保护义务研究", "跨境数据流动的合规审查与监管协同研究", "数字取证规则在网络犯罪治理中的适用研究"] },
    { direction: "刑事法治", type: "一般项目", keywords: ["认罪认罚", "轻罪治理", "证据规则", "网络犯罪", "程序分流"], titles: ["轻罪治理背景下认罪认罚从宽制度优化研究", "涉众型网络犯罪的证据标准与证明责任研究", "刑事速裁程序中的程序保障边界研究", "数字证据审查规则在刑事审判中的适用研究", "未成年人网络犯罪的分层治理机制研究"] },
    { direction: "民商法治", type: "青年项目", keywords: ["合同治理", "平台交易", "消费者权益", "侵权责任", "公司治理"], titles: ["平台经济背景下格式条款效力认定研究", "网络直播带货场景中的消费者救济机制研究", "数据侵权案件中的损害赔偿计算规则研究", "公司控制权争夺中的董事信义义务研究", "智能合约履行争议的私法回应研究"] },
    { direction: "知识产权法", type: "重点项目", keywords: ["著作权", "专利治理", "商标保护", "平台传播", "人工智能"], titles: ["生成式人工智能训练数据的著作权边界研究", "高价值专利培育中的行政与司法协同保护研究", "短视频二创生态中的作品合理使用规则研究", "平台电商场景中商标混淆责任认定研究", "开源模型应用中的知识产权风险分配研究"] },
    { direction: "国际法治", type: "重大项目", keywords: ["涉外法治", "国际仲裁", "合规治理", "出口管制", "投资保护"], titles: ["涉外法治建设中的企业合规审查机制研究", "国际商事仲裁中临时措施执行问题研究", "出口管制规则对跨国供应链合同的影响研究", "海外投资争端中的国家责任抗辩研究", "数字贸易规则重构中的中国法治回应研究"] },
    { direction: "行政法治", type: "一般项目", keywords: ["行政裁量", "政府数据开放", "比例原则", "行政处罚", "复议改革"], titles: ["行政裁量基准公开化的法治化路径研究", "政府数据开放中的公共利益衡量规则研究", "新行政处罚法实施中的过罚相当原则研究", "行政复议主渠道定位下程序协同研究", "基层综合执法改革中的权责配置研究"] },
    { direction: "司法制度", type: "重点项目", keywords: ["审判管理", "案例指导", "司法公开", "审级职能", "数字法院"], titles: ["数字法院建设中的审判权运行机制研究", "类案检索在裁判统一中的功能边界研究", "审级职能定位改革下再审启动规则研究", "司法公开与个人隐私保护的平衡机制研究", "案例指导制度提升裁判可预期性的路径研究"] },
    { direction: "社会治理法", type: "青年项目", keywords: ["基层治理", "劳动法", "平台用工", "社会保障", "纠纷预防"], titles: ["平台用工关系认定的劳动法路径研究", "灵活就业群体社会保障法治保障研究", "社区矛盾纠纷预防中的法治资源配置研究", "新业态劳动者职业伤害保障制度研究", "基层协商治理中的规则嵌入机制研究"] }
  ];

  const EXPERT_SEEDS = [["陈知衡", "华东政法大学"], ["林予安", "中国政法大学"], ["周明谦", "清华大学法学院"], ["顾南乔", "北京大学法学院"], ["宋砚秋", "复旦大学法学院"], ["沈若川", "武汉大学法学院"], ["梁思远", "吉林大学法学院"], ["许澄怀", "中南财经政法大学"], ["贺清岚", "厦门大学法学院"], ["唐景澜", "南京大学法学院"], ["裴知序", "上海交通大学凯原法学院"], ["程叙白", "中国人民大学法学院"], ["夏闻笛", "西南政法大学"], ["郑书宁", "山东大学法学院"], ["高言蹊", "浙江大学光华法学院"], ["何知礼", "四川大学法学院"], ["徐景行", "南开大学法学院"], ["柳承泽", "中山大学法学院"], ["傅清尘", "对外经济贸易大学法学院"], ["苏望舒", "华中科技大学法学院"], ["姜以衡", "中国社会科学院大学"], ["白令仪", "深圳大学法学院"], ["方既明", "兰州大学法学院"], ["罗闻致", "苏州大学王健法学院"]];
  const LECTURE_THEMES = ["数字法治前沿论坛", "刑事治理与证据规则工作坊", "平台经济与民商法青年沙龙", "涉外法治与合规治理研讨会", "知识产权与人工智能圆桌", "司法制度现代化专题讲座", "社会治理法治创新论坛", "行政法治实践案例会"];

  function unique(list) { return Array.from(new Set(list)); }
  function tokenize(text) {
    return unique(String(text || "").toLowerCase().replace(/[^\u4e00-\u9fa5a-z0-9]+/g, " ").split(/\s+/).filter(Boolean).flatMap((token) => /^[\u4e00-\u9fa5]{2,}$/.test(token) ? [token].concat(token.split("")) : [token]));
  }

  function buildTopics() {
    const topics = [];
    let id = 1;
    DIRECTION_SEEDS.forEach((seed, seedIndex) => {
      for (let variant = 0; variant < 3; variant += 1) {
        seed.titles.forEach((title, titleIndex) => {
          const year = 2014 + ((seedIndex * 7 + variant * 3 + titleIndex) % 12);
          const suffix = variant === 0 ? "" : variant === 1 ? "的实证评估" : "与治理体系优化";
          const leadExpertIndexes = [(seedIndex * 3 + titleIndex + variant) % EXPERT_SEEDS.length, (seedIndex * 3 + titleIndex + variant + 5) % EXPERT_SEEDS.length, (seedIndex * 3 + titleIndex + variant + 11) % EXPERT_SEEDS.length];
          topics.push({
            id: "LAW-" + String(id).padStart(3, "0"),
            title: title + suffix,
            year: year,
            type: seed.type,
            direction: seed.direction,
            keywords: unique(seed.keywords.concat([seed.direction, year >= 2021 ? "高质量发展" : "制度完善", titleIndex % 2 === 0 ? "司法实践" : "规范解释"])),
            leadExperts: leadExpertIndexes.map((index) => EXPERT_SEEDS[index][0]),
            x: 12 + ((seedIndex * 19 + titleIndex * 13 + variant * 17) % 76),
            y: 10 + ((seedIndex * 23 + titleIndex * 11 + variant * 9) % 78)
          });
          id += 1;
        });
      }
    });
    return topics;
  }

  const TOPICS = buildTopics();

  function buildExperts(topics) {
    return EXPERT_SEEDS.map((seed, index) => {
      const name = seed[0];
      const institution = seed[1];
      const relatedTopics = topics.filter((topic) => topic.leadExperts.includes(name));
      return {
        id: "EXP-" + String(index + 1).padStart(2, "0"),
        name: name,
        institution: institution,
        title: ["教授", "副教授", "研究员"][index % 3],
        directions: unique(relatedTopics.map((topic) => topic.direction)).slice(0, 3),
        topics: relatedTopics.map((topic) => topic.id).slice(0, 12),
        profile: name + "长期关注" + unique(relatedTopics.map((topic) => topic.direction)).slice(0, 3).join("、") + "等议题，兼具规范研究与实践评估经验。"
      };
    });
  }

  const EXPERTS = buildExperts(TOPICS);

  function buildLectures(experts) {
    const lectures = [];
    for (let i = 0; i < 56; i += 1) {
      const indexes = [i % experts.length, (i + 4) % experts.length, (i + 10) % experts.length, (i + 16) % experts.length];
      lectures.push({
        id: "LEC-" + String(i + 1).padStart(3, "0"),
        name: LECTURE_THEMES[i % LECTURE_THEMES.length] + "第" + (Math.floor(i / 8) + 1) + "期",
        date: (2019 + (i % 7)) + "-" + String((i % 12) + 1).padStart(2, "0") + "-" + String(((i * 3) % 27) + 1).padStart(2, "0"),
        experts: indexes.map((index) => experts[index].name)
      });
    }
    return lectures;
  }

  const LECTURES = buildLectures(EXPERTS);

  function getTopicByTitle(title) { return TOPICS.find((topic) => topic.title === title) || null; }
  function getExpertByName(name) { return EXPERTS.find((expert) => expert.name === name) || null; }
  function scoreTopicSimilarity(queryTopic, referenceTopic) {
    const queryTokens = new Set(tokenize([queryTopic.title || "", queryTopic.direction || "", (queryTopic.keywords || []).join(" ")].join(" ")));
    const refTokens = new Set(tokenize([referenceTopic.title, referenceTopic.direction, referenceTopic.keywords.join(" ")].join(" ")));
    let overlap = 0;
    queryTokens.forEach((token) => { if (refTokens.has(token)) { overlap += 1; } });
    const union = new Set([].concat(Array.from(queryTokens), Array.from(refTokens))).size || 1;
    return overlap / union;
  }
  function findSimilarTopics(queryTopic, limit) {
    return TOPICS.map((topic) => Object.assign({}, topic, { similarity: scoreTopicSimilarity(queryTopic, topic) })).filter((topic) => topic.similarity > 0).sort((a, b) => b.similarity - a.similarity || b.year - a.year).slice(0, limit || 5);
  }
  function recommendExperts(queryTopic, limit) {
    return EXPERTS.map((expert) => {
      const directionScore = expert.directions.includes(queryTopic.direction) ? 0.45 : 0;
      const topicMatches = TOPICS.filter((topic) => expert.topics.includes(topic.id) && (topic.direction === queryTopic.direction || topic.keywords.some((keyword) => (queryTopic.keywords || []).includes(keyword)))).length;
      return Object.assign({}, expert, { score: Math.min(0.98, directionScore + topicMatches * 0.1 + Math.min(expert.topics.length, 12) * 0.015) });
    }).sort((a, b) => b.score - a.score).slice(0, limit || 5);
  }
  function buildExpertNetwork(targetName) {
    const edgeMap = new Map();
    LECTURES.forEach((lecture) => {
      if (!lecture.experts.includes(targetName)) { return; }
      for (let i = 0; i < lecture.experts.length; i += 1) {
        for (let j = i + 1; j < lecture.experts.length; j += 1) {
          const pair = [lecture.experts[i], lecture.experts[j]].sort().join("__");
          edgeMap.set(pair, (edgeMap.get(pair) || 0) + 1);
        }
      }
    });
    const related = new Set([targetName]);
    edgeMap.forEach((value, pair) => { if (value > 0 && pair.includes(targetName)) { pair.split("__").forEach((name) => related.add(name)); } });
    const nodes = Array.from(related).map((name, index) => {
      const expert = getExpertByName(name);
      const angle = (Math.PI * 2 * index) / Math.max(related.size, 1);
      const radius = name === targetName ? 0 : 140;
      return { id: name, name: name, x: 200 + Math.cos(angle) * radius, y: 180 + Math.sin(angle) * radius, value: name === targetName ? 26 : 16, category: name === targetName ? "core" : "related", institution: expert ? expert.institution : "", directions: expert ? expert.directions : [] };
    });
    const links = Array.from(edgeMap.entries()).map((entry) => { const names = entry[0].split("__"); return { source: names[0], target: names[1], value: entry[1] }; }).filter((link) => related.has(link.source) && related.has(link.target));
    return { nodes: nodes, links: links };
  }
  function inferDirectionFromTitle(title) {
    const rules = [["数据", "数字法治"], ["算法", "数字法治"], ["平台", "民商法治"], ["认罪认罚", "刑事法治"], ["刑事", "刑事法治"], ["证据", "刑事法治"], ["著作权", "知识产权法"], ["专利", "知识产权法"], ["商标", "知识产权法"], ["涉外", "国际法治"], ["仲裁", "国际法治"], ["合规", "国际法治"], ["行政", "行政法治"], ["复议", "行政法治"], ["案例", "司法制度"], ["审判", "司法制度"], ["劳动", "社会治理法"], ["用工", "社会治理法"]];
    const matched = rules.find((rule) => title.indexOf(rule[0]) !== -1);
    return matched ? matched[1] : "数字法治";
  }
  window.ResearchPlatformData = { TOPICS: TOPICS, EXPERTS: EXPERTS, LECTURES: LECTURES, tokenize: tokenize, getTopicByTitle: getTopicByTitle, getExpertByName: getExpertByName, findSimilarTopics: findSimilarTopics, recommendExperts: recommendExperts, buildExpertNetwork: buildExpertNetwork, inferDirectionFromTitle: inferDirectionFromTitle };
}());
