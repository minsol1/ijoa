package com.checkitout.ijoa.statistics.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@Schema(description = "집중한 시간 그래프 응답")
public class FocusTimeResponse {

    @Schema(description = "단위", example = "2024-10-25")
    private final String unit;

    @Schema(description = "평균 집중도", example = "평균 집중도")
    private final Float avgAttentionRate;

    public static FocusTimeResponse test(String date) {
        return FocusTimeResponse.builder()
                .unit(date)
                .avgAttentionRate(10.5f)
                .build();
    }
}