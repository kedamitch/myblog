package blog.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/test")
public class Test {
	
	@RequestMapping("/testpage.do")
	public ModelAndView test() {
		ModelAndView mv = new ModelAndView();
		mv.addObject("test", "hehe");
		mv.setViewName("test");
		return mv;
	}
}