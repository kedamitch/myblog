package blog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import blog.service.TestService;

@Controller
@RequestMapping("/test")
public class TestController {
	
	@Autowired
	@Qualifier("testServiceImpl")
	private TestService test;
	
	@RequestMapping("/testpage.do")
	public ModelAndView test() {
		ModelAndView mv = new ModelAndView();
		System.out.println(test.testDB());
		mv.addObject("test", "hehe");
		mv.setViewName("test");
		return mv;
	}
}